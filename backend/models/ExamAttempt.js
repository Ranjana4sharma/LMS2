const mongoose = require("mongoose");

const examAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  score: { type: Number, required: true },
  answers: [{ type: String }],
  attemptedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ExamAttempt", examAttemptSchema);
