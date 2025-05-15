const Video = require("../models/Video");
const path = require("path");
const multer = require("multer");

// Allowed video and image formats
const allowedVideoMimeTypes = ["video/mp4", "video/mkv", "video/webm", "video/ogg"];
const allowedImageMimeTypes = ["image/jpeg", "image/png", "image/webp"];

// Multer storage configurations for video & thumbnail
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (allowedVideoMimeTypes.includes(file.mimetype)) {
      cb(null, "uploads/videos/"); // Save videos here
    } else if (allowedImageMimeTypes.includes(file.mimetype)) {
      cb(null, "uploads/thumbnails/"); // Save thumbnails here
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  if (allowedVideoMimeTypes.includes(file.mimetype) || allowedImageMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only video and image files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// ✅ Controller to handle video & thumbnail upload
const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: "Video and thumbnail are required." });
    }

    const newVideo = new Video({
      title,
      description,
      videoPath: `/uploads/videos/${req.files.video[0].filename}`,
      thumbnailPath: `/uploads/thumbnails/${req.files.thumbnail[0].filename}`,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    res.status(500).json({ message: "Error uploading video", error: error.message });
  }
};

// ✅ Controller to fetch all videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
};

module.exports = { upload, uploadVideo, getVideos };
