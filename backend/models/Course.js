const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Programming", "Design", "Marketing", "Business", "Other"], // Extendable
    },
    thumbnail: {
      type: String, // URL or local path of course thumbnail image
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0, // 0 means free
    },
    isFree: {
      type: Boolean,
      default: true, // If price > 0, this should be false
    },
    duration: {
      type: Number, // Total course duration in hours
      required: true,
    },
    lessons: [
      {
        title: String,
        videoUrl: String, // Video URL or local path
        duration: Number, // Video length in minutes
        timestamps: [String], // Key timestamps (optional)
      },
    ],
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming trainers are stored in the "users" collection
      required: true,
    },
    exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam", // Reference to Exam model
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isApproved: {
      type: Boolean,
      default: false, // Courses need admin approval
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
