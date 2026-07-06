const multer = require("multer");

const uploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).send({
                success: false,
                message: "Image size must be less than 2 MB."
            });
        }
    }
    if (err.name === "MulterFileTypeError") {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
    next(err);
};

module.exports = uploadError;