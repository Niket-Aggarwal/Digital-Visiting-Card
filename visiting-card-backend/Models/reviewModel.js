const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
    {
        authId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true, unique: true },
        star: { type: Number, required: true, min: 1, max: 5 },
        feedback: { type: String, required: true, trim: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedSchema);