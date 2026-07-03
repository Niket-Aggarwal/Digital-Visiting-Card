const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        otp: { type: String },
        otpExpiry: { type: Date }
    },
    { timestamps: true });

module.exports = mongoose.model("Verify", verificationSchema);