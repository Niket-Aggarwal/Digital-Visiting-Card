const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
    {
        feedback: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedSchema);