const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { 
  registerUser,  // Ensure this function exists in userController.js
  loginUser,     // Ensure this function exists in userController.js
  getUserProfile // Ensure this function exists in userController.js
} = require("../controllers/userController");

// ✅ User Registration
router.post("/register", registerUser);

// ✅ User Login
router.post("/login", loginUser);

// ✅ Get User Profile
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
