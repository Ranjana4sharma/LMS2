const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");
const Trainer = require("../models/Trainer");
const Examiner = require("../models/Examiner");

// Register User - No Token generation here
exports.registerUser = async (req, res) => {
    try {
        const { fullName, username, email, password, dob, gender, interest, qualification } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, username, email, password: hashedPassword, dob, gender, interest, qualification });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Register Admin - No Token generation here

exports.registerAdmin = async (req, res) => {
    try {
        const { fullName, username, email, password, role } = req.body;

        // Validate input fields
        if (!fullName || !username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({ fullName, username, email, password: hashedPassword, role });

        // Save the admin
        await newAdmin.save();

        // Respond with success message
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error registering admin:", error);

        // Respond with error message
        res.status(500).json({ message: "Internal server error" });
    }
};


// Register Trainer - No Token generation here
exports.registerTrainer = async (req, res) => {
    try {
        const { fullName, username, email, password, phoneNumber, gender, professionalTitle } = req.body;

        const existingTrainer = await Trainer.findOne({ email });
        if (existingTrainer) {
            return res.status(400).json({ message: "Trainer already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newTrainer = new Trainer({ fullName, username, email, password: hashedPassword, phoneNumber, gender, professionalTitle, isApproved: false });
        await newTrainer.save();

        res.status(201).json({ message: "Trainer registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Register Examiner - No Token generation here
exports.registerExaminer = async (req, res) => {
  try {
      const { fullName, username, email, password, phoneNumber, gender } = req.body;

      const existingExaminer = await Examiner.findOne({ email });
      if (existingExaminer) {
          return res.status(400).json({ message: "Examiner already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newExaminer = new Examiner({ fullName, username, email, password: hashedPassword, phoneNumber, gender });
      await newExaminer.save();

      res.status(201).json({ message: "Examiner registered successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};

// Login - Token generated only here after successful login and authentication
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        let user;

        // Find user based on role and verify credentials
        switch (role) {
            case "admin":
                user = await Admin.findOne({ email });
                break;
            case "trainer":
                user = await Trainer.findOne({ email, isApproved: true }); // Ensure trainer is approved
                break;
            case "registeredUser":
                user = await User.findOne({ email });
                break;
            case "examiner":
                user = await Examiner.findOne({ email });
                break;
            default:
                return res.status(400).json({ message: "Invalid role" });
        }

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Token generation only on successful login
        const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ message: "Login successful", token, role });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
