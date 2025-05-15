const express = require("express");
const router = express.Router();
const { getVideos, upload, uploadVideo } = require("../controllers/videoController");

// Route for fetching all videos from MongoDB
router.get("/", getVideos);

// ✅ Updated route for uploading a video with thumbnail
router.post("/upload", upload.fields([{ name: "video" }, { name: "thumbnail" }]), uploadVideo);

module.exports = router;
