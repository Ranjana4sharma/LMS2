const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'trainer', 'examiner', 'registeredUser', 'guestUser'], 
    default: 'guestUser',
    trim: true 
  },
  profilePicture: { type: String, trim: true },
  phoneNumber: { type: String, trim: true },
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'], trim: true, lowercase: true },
  interest: { type: String, trim: true, lowercase: true },
  qualification: { type: String, trim: true, lowercase: true }
});

// ✅ Prevent Overwriting Issue
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
