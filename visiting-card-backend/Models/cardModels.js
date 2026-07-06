const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        authId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
            required: true,
            unique: true
        },
        name: { type: String, required: true },
        headline: { type: String, required: true },
        bio: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String, default: null },
        imageId: { type: String, default: null },
        phno: { type: String },
        github: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        telegram: { type: String },
        others: [
            { _id: false, platform: String, link: String }
        ],
        theme: { type: String, default: "dark" },
        layout: { type: String, default: "modern" },
        slug: { type: String, unique: true, required: true },
        isPublic: { type: Boolean, default: true },
        userType: { type: String, default: "free" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);