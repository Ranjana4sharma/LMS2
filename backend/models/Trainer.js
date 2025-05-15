const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false },
  professionalTitle: { type: String, trim: true },
  organizationName: { type: String, trim: true },
  organizationAddress: { type: String, trim: true },
  totalExperience: { type: Number, required: true },
  careerDescription: { type: String, trim: true },
});

// ✅ Method to check approval status
trainerSchema.methods.checkApproval = function () {
  return this.isApproved;
};

const Trainer = mongoose.models.Trainer || mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
