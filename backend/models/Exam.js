const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  duration: { type: Number, required: true }, // Duration in minutes
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  approvedByAdmin: { type: Boolean, default: false }, // Admin approval required
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
