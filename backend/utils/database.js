const mongoose = require('mongoose');

/**
 * Check if a string is a valid MongoDB ObjectId
 * @param {string} id - ID to validate
 * @returns {boolean} - Is valid ObjectId
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Convert string to ObjectId
 * @param {string} id - ID string
 * @returns {ObjectId} - MongoDB ObjectId
 */
const toObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

/**
 * Build pagination object
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {object} - Pagination object
 */
const buildPagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null
  };
};

/**
 * Build sort object from query string
 * @param {string} sortQuery - Sort query string (e.g., '-createdAt,title')
 * @param {array} allowedFields - Array of allowed sort fields
 * @returns {object} - MongoDB sort object
 */
const buildSortObject = (sortQuery, allowedFields = []) => {
  if (!sortQuery) return { createdAt: -1 }; // Default sort
  
  const sortFields = sortQuery.split(',');
  const sortObject = {};
  
  sortFields.forEach(field => {
    const trimmedField = field.trim();
    const isDescending = trimmedField.startsWith('-');
    const fieldName = isDescending ? trimmedField.slice(1) : trimmedField;
    
    // Only allow whitelisted fields
    if (allowedFields.length === 0 || allowedFields.includes(fieldName)) {
      sortObject[fieldName] = isDescending ? -1 : 1;
    }
  });
  
  return Object.keys(sortObject).length > 0 ? sortObject : { createdAt: -1 };
};

/**
 * Build search query for text fields
 * @param {string} searchTerm - Search term
 * @param {array} searchFields - Fields to search in
 * @returns {object} - MongoDB query object
 */
const buildSearchQuery = (searchTerm, searchFields = []) => {
  if (!searchTerm || searchFields.length === 0) return {};
  
  const searchRegex = new RegExp(searchTerm, 'i');
  
  return {
    $or: searchFields.map(field => ({
      [field]: searchRegex
    }))
  };
};

/**
 * Build filter query from request query parameters
 * @param {object} queryParams - Request query parameters
 * @param {object} filterMap - Map of query param to database field
 * @returns {object} - MongoDB filter object
 */
const buildFilterQuery = (queryParams, filterMap = {}) => {
  const filter = {};
  
  Object.keys(filterMap).forEach(queryParam => {
    const dbField = filterMap[queryParam];
    const value = queryParams[queryParam];
    
    if (value !== undefined && value !== null && value !== '') {
      // Handle array values (e.g., tags)
      if (Array.isArray(value)) {
        filter[dbField] = { $in: value };
      }
      // Handle comma-separated values
      else if (typeof value === 'string' && value.includes(',')) {
        const values = value.split(',').map(v => v.trim());
        filter[dbField] = { $in: values };
      }
      // Handle boolean values
      else if (value === 'true' || value === 'false') {
        filter[dbField] = value === 'true';
      }
      // Handle regular values
      else {
        filter[dbField] = value;
      }
    }
  });
  
  return filter;
};

/**
 * Execute aggregation pipeline with error handling
 * @param {Model} Model - Mongoose model
 * @param {array} pipeline - Aggregation pipeline
 * @returns {Promise} - Aggregation result
 */
const executeAggregation = async (Model, pipeline) => {
  try {
    return await Model.aggregate(pipeline);
  } catch (error) {
    console.error('Aggregation error:', error);
    throw new Error('Database aggregation failed');
  }
};

/**
 * Execute transaction with retry logic
 * @param {function} operation - Operation to execute in transaction
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise} - Transaction result
 */
const executeTransaction = async (operation, maxRetries = 3) => {
  const session = await mongoose.startSession();
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      session.startTransaction();
      const result = await operation(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
    } finally {
      if (attempt === maxRetries) {
        session.endSession();
      }
    }
  }
};

/**
 * Sanitize database query to prevent injection
 * @param {object} query - Query object
 * @returns {object} - Sanitized query
 */
const sanitizeQuery = (query) => {
  const sanitized = {};
  
  Object.keys(query).forEach(key => {
    const value = query[key];
    
    // Remove any keys that start with $ (MongoDB operators)
    if (key.startsWith('$')) {
      return;
    }
    
    // Recursively sanitize nested objects
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeQuery(value);
    } else {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};

/**
 * Get database connection status
 * @returns {object} - Connection status
 */
const getConnectionStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    state: states[state] || 'unknown',
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name
  };
};

/**
 * Close database connection gracefully
 * @returns {Promise} - Close promise
 */
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};

module.exports = {
  isValidObjectId,
  toObjectId,
  buildPagination,
  buildSortObject,
  buildSearchQuery,
  buildFilterQuery,
  executeAggregation,
  executeTransaction,
  sanitizeQuery,
  getConnectionStatus,
  closeConnection
};

