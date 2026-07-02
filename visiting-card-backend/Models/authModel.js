const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, default: null },
        isEmailVerfied: { type: Boolean, default: false },
        authProvider: { type: String },
        googleId: { type: String, default: null },
        picture: { type: String, default: null }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);