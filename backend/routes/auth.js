// routes/auth.js
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyToken,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

// OPCIONALES (solo si existen en tu proyecto)
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
} = require("../middleware/validation") || {};

// ----------------------
// 🔓 PUBLIC ROUTES
// ----------------------
router.post("/register", validateUserRegistration ?? [], register);
router.post("/login", validateUserLogin ?? [], login);
router.post("/forgot-password", forgotPassword);

// reset token por URL (más estándar)
router.post("/reset-password/:resettoken", resetPassword);

// Verificar validez del token (opcional)
router.post("/verify", verifyToken);

// ----------------------
// 🔒 PROTECTED ROUTES
// ----------------------
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

router.put(
  "/update-details",
  protect,
  validateUserUpdate ?? [],
  updateDetails
);

router.put("/update-password", protect, updatePassword);

module.exports = router;
