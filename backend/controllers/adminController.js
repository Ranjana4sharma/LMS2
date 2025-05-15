const Admin = require("../models/Admin"); // Import Admin model
const Trainer = require("../models/Trainer"); // Import Trainer model

// ✅ Admin Registration
const registerAdmin = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const newAdmin = new Admin({ fullName, username, email, password, role: "admin" });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error("🔥 Admin Registration Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Approve Trainer
const approveTrainer = async (req, res) => {
  console.log("✅ Approve Trainer API Called");
  console.log("Received Trainer ID:", req.params.trainerId);
  console.log("Admin Role:", req.user?.role);
  try {
    const { trainerId } = req.params;

    if (!trainerId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Trainer ID format" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin privileges required" });
    }

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    if (trainer.isApproved) {
      return res.status(400).json({ message: "Trainer is already approved" });
    }

    trainer.isApproved = true;
    await trainer.save();

    res.status(200).json({ message: "Trainer approved successfully.", trainer });
  } catch (error) {
    console.error("🔥 Trainer Approval Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Other Admin Functions (Placeholder)
const addRemoveCourse = async (req, res) => { /* existing code */ };
const approveExam = async (req, res) => { /* existing code */ };
const blockUser = async (req, res) => { /* existing code */ };
const changeAdminPassword = async (req, res) => { /* existing code */ };
const editDeleteExam = async (req, res) => { /* existing code */ };
const monitorExamSubmissions = async (req, res) => { /* existing code */ };
const issueCertificate = async (req, res) => { /* existing code */ };
const verifyExamResults = async (req, res) => { /* existing code */ };

// ✅ Export All Functions
module.exports = {
  registerAdmin, // 🔥 Fixed Missing Function
  approveTrainer,
  addRemoveCourse,
  approveExam,
  blockUser,
  changeAdminPassword,
  editDeleteExam,
  monitorExamSubmissions,
  issueCertificate,
  verifyExamResults,
};
