const Trainer = require('../models/Trainer');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// ✅ Register Trainer (FIXED FUNCTION)
const registerTrainer = async (req, res) => {
  try {
    const { userId, professionalTitle, organizationName, organizationAddress, totalExperience, careerDescription } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if trainer already exists
    const existingTrainer = await Trainer.findOne({ userId });
    if (existingTrainer) {
      return res.status(400).json({ message: "Trainer profile already exists." });
    }

    // Create trainer profile
    const trainer = new Trainer({
      userId,
      professionalTitle,
      organizationName,
      organizationAddress,
      totalExperience,
      careerDescription,
      isApproved: false, // Admin must approve first
    });

    await trainer.save();

    res.status(201).json({ message: "Trainer registered successfully. Awaiting admin approval.", trainer });
  } catch (error) {
    console.error("⛔ Error registering trainer:", error);
    res.status(500).json({ message: "Error registering trainer", error });
  }
};

// ✅ Get Trainer Profile
const getTrainerProfile = async (req, res) => {
  const { trainerId } = req.params;

  try {
    const trainer = await Trainer.findById(trainerId).populate('userId', 'fullName username email');
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainer profile', error });
  }
};

// ✅ Update Trainer Profile (Only Approved Trainers)
const updateTrainerProfile = async (req, res) => {
  const { professionalTitle, organizationName, organizationAddress, totalExperience, careerDescription } = req.body;

  try {
    const trainer = await Trainer.findOne({ userId: req.user._id });

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    if (!trainer.isApproved) {
      return res.status(403).json({ message: 'Profile update not allowed until admin approval.' });
    }

    trainer.professionalTitle = professionalTitle || trainer.professionalTitle;
    trainer.organizationName = organizationName || trainer.organizationName;
    trainer.organizationAddress = organizationAddress || trainer.organizationAddress;
    trainer.totalExperience = totalExperience || trainer.totalExperience;
    trainer.careerDescription = careerDescription || trainer.careerDescription;

    await trainer.save();

    res.status(200).json({ message: 'Trainer profile updated successfully', trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trainer profile', error });
  }
};

// ✅ Admin Approval for Trainer (Admin Only)
const approveTrainer = async (req, res) => {
  const { trainerId } = req.params;

  try {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    trainer.isApproved = true;
    await trainer.save();

    res.status(200).json({ message: "Trainer approved successfully", trainer });
  } catch (error) {
    res.status(500).json({ message: "Error approving trainer", error });
  }
};

// ✅ EXPORT ALL FUNCTIONS
module.exports = { registerTrainer, getTrainerProfile, updateTrainerProfile, approveTrainer };
