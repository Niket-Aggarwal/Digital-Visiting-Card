const mongoose = require("mongoose");
const { defaultMaxListeners } = require("nodemailer/lib/xoauth2");

const verificationSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: { type: String, default: null },
        otp: { type: String },
        otpExpiry: { type: Date }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Verify", verificationSchema);