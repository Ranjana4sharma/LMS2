const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { 
  approveTrainer, 
  addRemoveCourse, 
  approveExam, 
  blockUser, 
  changeAdminPassword, 
  editDeleteExam, 
  monitorExamSubmissions, 
  issueCertificate, 
  verifyExamResults 
} = require("../controllers/adminController");

// ✅ Approve Trainer Registration
router.put("/trainer/:trainerId", authMiddleware, roleMiddleware(["admin"]), approveTrainer);

// ✅ Approve/Remove Courses
router.post("/course", authMiddleware, roleMiddleware(["admin"]), addRemoveCourse);

// ✅ Approve Exams before uploading
router.post("/exam/approve/:examId", authMiddleware, roleMiddleware(["admin"]), approveExam);

// ✅ Block/Unblock Users
router.put("/user/block/:userId", authMiddleware, roleMiddleware(["admin"]), blockUser);

// ✅ Change Admin Password
router.put("/change-password", authMiddleware, roleMiddleware(["admin"]), changeAdminPassword);

// ✅ Edit or Delete Exams
router.put("/exam/edit/:examId", authMiddleware, roleMiddleware(["admin"]), editDeleteExam);
router.delete("/exam/delete/:examId", authMiddleware, roleMiddleware(["admin"]), editDeleteExam);

// ✅ Monitor Exam Submissions & Results
router.get("/exam-submissions", authMiddleware, roleMiddleware(["admin"]), monitorExamSubmissions);

// ✅ Issue Certificates for Course Completion
router.post("/certificate/:userId/:courseId", authMiddleware, roleMiddleware(["admin"]), issueCertificate);

// ✅ Verify Exam Results Before Certificate Generation
router.get("/verify-exam/:userId/:examId", authMiddleware, roleMiddleware(["admin"]), verifyExamResults);

module.exports = router;
