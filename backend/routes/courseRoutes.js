const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Route to create a new course (Only trainers can create courses)
router.post("/", authMiddleware("trainer"), createCourse);

// Route to get all courses (Accessible to all users)
router.get("/", authMiddleware(), getCourses);

// Route to get a specific course by ID (Accessible to all users)
router.get("/:id", authMiddleware(), getCourseById);

// Route to update a course (Only trainers can update their own courses)
router.put("/:id", authMiddleware("trainer"), updateCourse);

// Route to delete a course (Only trainers can delete their own courses)
router.delete("/:id", authMiddleware("trainer"), deleteCourse);

module.exports = router;
