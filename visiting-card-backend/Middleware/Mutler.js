const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowed = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];
    if (allowed.includes(file.mimetype)) {
        return cb(null, true);
    }
    const err = new Error("Only JPG, PNG and WEBP images are allowed.");
    err.name = "MulterFileTypeError";
    cb(err);
};

const upload = multer({
    storage,
    limits: {
        fileSize: Number(process.env.MAX_IMAGE_SIZE)
    },
    fileFilter
});

module.exports = upload;