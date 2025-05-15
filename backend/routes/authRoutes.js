const express = require("express");
const router = express.Router();
const { registerUser, registerTrainer, registerAdmin,registerExaminer, login } = require("../controllers/authController");

// ✅ Common User Registration
router.post("/user/register", registerUser);

// ✅ Trainer Registration
router.post("/trainer/register", registerTrainer);

// ✅ Examiner Registration
router.post("/examiner/register", registerExaminer);

// ✅ Admin Registration
router.post("/admin/register", registerAdmin);

// ✅ Common Login Endpoint for All Roles
router.post("/login", login);

module.exports = router;
