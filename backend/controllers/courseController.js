const Course = require("../models/Course");
const User = require("../models/User");

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Trainer Only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, thumbnail, price, duration, lessons } = req.body;

    if (!title || !description || !category || !thumbnail || !duration) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Check if the logged-in user is a trainer
    const trainer = await User.findById(req.user.id);
    if (!trainer || trainer.role !== "trainer") {
      return res.status(403).json({ message: "Only trainers can create courses." });
    }

    // Create course (no admin approval needed)
    const newCourse = new Course({
      title,
      description,
      category,
      thumbnail,
      price,
      isFree: price === 0,
      duration,
      lessons,
      trainer: req.user.id,
      isApproved: true, // Courses are approved by default
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully.", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all courses (only approved courses for users)
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isApproved: true }).populate("trainer", "fullName username");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get a specific course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("trainer", "fullName username");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a course (Trainer Only)
// @route   PUT /api/courses/:id
// @access  Private (Trainer Only)
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, category, thumbnail, price, duration, lessons } = req.body;
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure only the trainer who created it can update it
    if (course.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own courses" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.thumbnail = thumbnail || course.thumbnail;
    course.price = price || course.price;
    course.duration = duration || course.duration;
    course.lessons = lessons || course.lessons;

    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a course (Trainer Only)
// @route   DELETE /api/courses/:id
// @access  Private (Trainer Only)
exports.deleteCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure only the trainer who created it can delete it
    if (course.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own courses" });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
