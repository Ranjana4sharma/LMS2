require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Updated to match your `db.js`

// Import Routes
const videoRoutes = require("./routes/videoRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const examRoutes = require("./routes/examRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow all needed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
    credentials: true, // Enable credentials (cookies, tokens)
  })
);

// ✅ Middleware for Parsing Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For handling form-data

// ✅ Serve static files (for profile pictures, videos, PDFs, etc.)
app.use("/uploads", express.static("uploads"));

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/videos", videoRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
