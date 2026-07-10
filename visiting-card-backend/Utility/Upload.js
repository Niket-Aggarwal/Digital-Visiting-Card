const cloudinary = require("../Config/Cloudinary");
const streamifier = require("streamifier");

const uploadImage = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "nexlink/profile",
                resource_type: "image"
            },
            (err, result) => {
                if (err) {
                    const error = new Error("Unable to upload image. Please try again.");
                    error.name = "CloudinaryError";
                    return reject(error);
                }
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};


const deleteImage = async (publicId) => {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
};


module.exports = { uploadImage, deleteImage };