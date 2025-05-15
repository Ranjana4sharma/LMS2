const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  getExams,
  submitExam,
  getExamAttempts,
  downloadSyllabus,
  getExaminerProgress,
  reattemptExam,
  createExam,
} = require("../controllers/examController");

// ✅ Get all approved exams (Only for Registered Users & Examiners)
router.get("/", authMiddleware, roleMiddleware(["registered_user", "examiner"]), getExams);

// ✅ Submit an exam attempt (Only for Registered Users & Examiners, one attempt per exam)
router.post("/submit", authMiddleware, roleMiddleware(["registered_user", "examiner"]), submitExam);

// ✅ Get exam attempts (Only for Registered Users & Examiners)
router.get("/attempts", authMiddleware, roleMiddleware(["registered_user", "examiner"]), getExamAttempts);

// ✅ Download syllabus (Only for Registered Users & Examiners)
router.get("/syllabus/:examId", authMiddleware, roleMiddleware(["registered_user", "examiner"]), downloadSyllabus);

// ✅ Get examiner progress report (Only for Examiners)
router.get("/progress", authMiddleware, roleMiddleware(["examiner"]), getExaminerProgress);

// ✅ Allow reattempting an exam (Only for Registered Users & Examiners)
router.post("/reattempt", authMiddleware, roleMiddleware(["registered_user", "examiner"]), reattemptExam);

module.exports = router;
