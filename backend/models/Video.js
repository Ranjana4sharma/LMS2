const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    videoPath: { type: String, required: true }, // Ensure correct video storage path
    thumbnail: { type: String, required: true }, // Thumbnail should be required
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Video", VideoSchema);
