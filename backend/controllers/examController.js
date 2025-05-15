const mongoose = require("mongoose");
const Exam = require("../models/Exam");
const ExamAttempt = require("../models/ExamAttempt");
const User = require("../models/User");

// ✅ Get all approved exams (Only for Registered Users & Examiners) - With Pagination
const getExams = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Defaults to page 1, limit 10
    const exams = await Exam.find({ approvedByAdmin: true })
      .populate("createdBy", "fullName")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ exams, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error });
  }
};

// ✅ Create an exam (Only for Examiners & Admins) - Uses MongoDB Transaction
const createExam = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { title, description, questions } = req.body;
    const createdBy = req.user._id; // Authenticated examiner or admin

    if (!title || !description || questions.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExam = new Exam({
      title,
      description,
      questions,
      createdBy,
      approvedByAdmin: false, // Requires admin approval
    });

    await newExam.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Exam created successfully", newExam });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Error creating exam", error });
  }
};

// ✅ Submit an exam attempt (Only for Registered Users & Examiners)
const submitExam = async (req, res) => {
  const { examId, answers } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(examId)) {
    return res.status(400).json({ message: "Invalid exam ID" });
  }

  try {
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (!exam.approvedByAdmin) return res.status(403).json({ message: "Exam not approved yet" });

    // Unique Attempt Check (Alternative: Create an index in the model)
    const existingAttempt = await ExamAttempt.findOne({ userId, examId });
    if (existingAttempt) return res.status(400).json({ message: "Already attempted" });

    // Calculate score
    const score = exam.questions.reduce((total, q, index) => (
      q.correctAnswer === answers[index] ? total + 1 : total
    ), 0);

    // Save attempt
    const attempt = new ExamAttempt({ userId, examId, score, answers });
    await attempt.save();

    res.status(201).json({ message: "Exam submitted successfully", score, totalQuestions: exam.questions.length });
  } catch (error) {
    res.status(500).json({ message: "Error submitting exam", error });
  }
};

// ✅ Get exam attempts for a user (Only for Registered Users & Examiners)
const getExamAttempts = async (req, res) => {
  try {
    const attempts = await ExamAttempt.find({ userId: req.user._id }).populate("examId", "title");
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam attempts", error });
  }
};

// ✅ Download syllabus (Only for Registered Users & Examiners)
const downloadSyllabus = async (req, res) => {
  try {
    const { examId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    const exam = await Exam.findById(examId);
    if (!exam || !exam.syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    res.download(exam.syllabus);
  } catch (error) {
    res.status(500).json({ message: "Error downloading syllabus", error });
  }
};

// ✅ Get progress report (Only for Examiners)
const getExaminerProgress = async (req, res) => {
  try {
    if (req.user.role !== "examiner") {
      return res.status(403).json({ message: "Access denied! Only examiners can view progress reports." });
    }

    const attempts = await ExamAttempt.find({ userId: req.user._id }).populate("examId", "title score");
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress report", error });
  }
};

// ✅ Reattempt Exam (Only for Registered Users & Examiners)
const reattemptExam = async (req, res) => {
  const { examId } = req.body;
  const userId = req.user._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid exam ID" });
    }

    // Remove previous attempt
    await ExamAttempt.deleteOne({ userId, examId });

    res.status(200).json({ message: "You can now reattempt the exam" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting exam attempt", error });
  }
};

module.exports = {
  getExams,
  createExam,
  submitExam,
  getExamAttempts,
  downloadSyllabus,
  getExaminerProgress,
  reattemptExam,
};
