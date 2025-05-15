const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { approveTrainer, getTrainerProfile, updateTrainerProfile } = require('../controllers/trainerController');

// ✅ Admin Approves Trainer (Only Admins)
router.put('/approve/:trainerId', authMiddleware, roleMiddleware(['admin']), approveTrainer);

// ✅ Get Trainer Profile (Anyone can view)
router.get('/profile/:trainerId', getTrainerProfile);

// ✅ Trainer Updates Their Profile
router.put('/profile', authMiddleware, roleMiddleware(['trainer']), updateTrainerProfile);

module.exports = router;
