const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // No hashing here
  role: { type: String, enum: ["admin"], default: "admin" },
  profilePicture: { type: String },
  phoneNumber: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);
