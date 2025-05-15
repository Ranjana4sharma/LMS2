const mongoose = require("mongoose");

const examinerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  organizationName: { type: String },
});

// ✅ Ensure model is not recompiled multiple times
const Examiner = mongoose.models.Examiner || mongoose.model("Examiner", examinerSchema);

module.exports = Examiner;
