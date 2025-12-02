const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  // Target information (what this feedback is for)
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Target ID is required'],
    refPath: 'targetType'
  },
  targetType: {
    type: String,
    required: [true, 'Target type is required'],
    enum: ['Media', 'Project', 'User']
  },
  
  // Feedback type
  feedbackType: {
    type: String,
    required: [true, 'Feedback type is required'],
    enum: ['comment', 'rating', 'review', 'suggestion']
  },
  
  // Author information
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  
  // Content
  content: {
    type: String,
    required: function() {
      return ['comment', 'review', 'suggestion'].includes(this.feedbackType);
    },
    maxlength: [1000, 'Feedback content cannot exceed 1000 characters'],
    trim: true
  },
  
  // Rating (for rating and review types)
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    required: function() {
      return ['rating', 'review'].includes(this.feedbackType);
    }
  },
  
  // Threading for replies
  parentFeedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
    default: null
  },
  
  // Replies to this feedback
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback'
  }],
  
  // Engagement on this feedback
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Moderation
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  isFlagged: {
    type: Boolean,
    default: false
  },
  flaggedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: {
      type: String,
      enum: ['spam', 'inappropriate', 'harassment', 'copyright', 'other']
    },
    flaggedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Visibility
  visibility: {
    type: String,
    enum: ['public', 'private', 'hidden'],
    default: 'public'
  },
  
  // Helpful votes (for reviews and suggestions)
  helpfulVotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isHelpful: {
      type: Boolean,
      required: true
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for like count
feedbackSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for reply count
feedbackSchema.virtual('replyCount').get(function() {
  return this.replies ? this.replies.length : 0;
});

// Virtual for helpful vote count
feedbackSchema.virtual('helpfulCount').get(function() {
  return this.helpfulVotes ? this.helpfulVotes.filter(vote => vote.isHelpful).length : 0;
});

// Virtual for not helpful vote count
feedbackSchema.virtual('notHelpfulCount').get(function() {
  return this.helpfulVotes ? this.helpfulVotes.filter(vote => !vote.isHelpful).length : 0;
});

// Indexes for better performance
feedbackSchema.index({ targetId: 1, targetType: 1 });
feedbackSchema.index({ author: 1, createdAt: -1 });
feedbackSchema.index({ parentFeedback: 1 });
feedbackSchema.index({ feedbackType: 1 });
feedbackSchema.index({ visibility: 1, isDeleted: 1 });

// Method to check if user can view this feedback
feedbackSchema.methods.canView = function(userId) {
  if (this.isDeleted) return false;
  if (this.visibility === 'public') return true;
  if (this.visibility === 'private') return this.author.toString() === userId.toString();
  return false;
};

// Method to check if user can edit this feedback
feedbackSchema.methods.canEdit = function(userId) {
  if (this.isDeleted) return false;
  return this.author.toString() === userId.toString();
};

// Method to check if user can delete this feedback
feedbackSchema.methods.canDelete = function(userId) {
  // Author can always delete their own feedback
  if (this.author.toString() === userId.toString()) return true;
  
  // TODO: Add logic for moderators/admins
  // For now, only the author can delete
  return false;
};

// Method to add a like
feedbackSchema.methods.addLike = function(userId) {
  const existingLike = this.likes.find(like => like.user.toString() === userId.toString());
  if (!existingLike) {
    this.likes.push({ user: userId });
  }
  return this.save();
};

// Method to remove a like
feedbackSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  return this.save();
};

// Method to add a reply
feedbackSchema.methods.addReply = function(replyId) {
  if (!this.replies.includes(replyId)) {
    this.replies.push(replyId);
  }
  return this.save();
};

// Method to add helpful vote
feedbackSchema.methods.addHelpfulVote = function(userId, isHelpful) {
  const existingVote = this.helpfulVotes.find(vote => vote.user.toString() === userId.toString());
  
  if (existingVote) {
    existingVote.isHelpful = isHelpful;
    existingVote.votedAt = new Date();
  } else {
    this.helpfulVotes.push({
      user: userId,
      isHelpful,
      votedAt: new Date()
    });
  }
  
  return this.save();
};

// Method to flag feedback
feedbackSchema.methods.flagFeedback = function(userId, reason) {
  const existingFlag = this.flaggedBy.find(flag => flag.user.toString() === userId.toString());
  
  if (!existingFlag) {
    this.flaggedBy.push({
      user: userId,
      reason,
      flaggedAt: new Date()
    });
    
    // Auto-flag if multiple users flag it
    if (this.flaggedBy.length >= 3) {
      this.isFlagged = true;
    }
  }
  
  return this.save();
};

// Method to soft delete
feedbackSchema.methods.softDelete = function(deletedBy = null) {
  this.isDeleted = true;
  this.deletedAt = new Date();
  if (deletedBy) {
    this.deletedBy = deletedBy;
  }
  return this.save();
};

// Pre-save middleware to handle edited flag
feedbackSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.isEdited = true;
    this.editedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Feedback', feedbackSchema);

