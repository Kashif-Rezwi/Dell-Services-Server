const { mongoose } = require("mongoose");

const userVerificationSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: Number, required: true },
  },
  { versionKey: false }
);

const UserVerificationModel = mongoose.model(
  "userVerificationPending",
  userVerificationSchema
);

module.exports = {
  UserVerificationModel,
};
