const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        headline: { type: String, required: true },
        bio: { type: String, required: true },
        email: { type: String, required: true },
        phno: { type: String },
        image: { type: String },
        github: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        telegram: { type: String },
        others: [
            { platform: String, link: String }
        ],
        theme: { type: String, default: "light" },
        layout: { type: String, default: "modern" },
        slug: { type: String, unique: true, required: true },
        isPublic: { type: Boolean, default: true },
        userType: { type: String, default: "free" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);