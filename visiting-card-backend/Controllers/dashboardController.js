const authModel = require("../Models/authModel")
const cardModel = require("../Models/cardModels")
const { EmailCheck, Namecheck, tokencheck, tokenerr } = require("../Utility/Customwork")
const { slugCreate, phnocheck } = require("../Utility/Dasboardwork")
const { uploadImage, deleteImage } = require("../Utility/Upload");


exports.Base = async (req, res) => {
    res.status(200).send({
        Title: "NexLink",
        Tagline: "Next Generation Digital Identity",
        message: "This is Dashboard Base Url"
    });
}


exports.Main = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const exist = await cardModel.findOne({ authId: result.decoded.id }).select("-_id -__v -createdAt -updatedAt -authId -imageId");
        if (!exist) {
            return res.status(200).send({
                success: false,
                message: "Lets Make your First Digital Identiy"
            });
        }
        return res.status(200).send({
            success: true,
            Card: exist
        });
    } catch (err) {
        const result = tokenerr(err, "Main Error:")
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        })
    }
};


exports.First = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const { name, headline, bio, email, slug } = req.body;
        EmailCheck(email);
        Namecheck(name);
        const exist = await cardModel.findOne({ authId: result.decoded.id });
        const originalSlug = exist?.slug.split("-")[0];
        let newslug, slugcheck;
        if (slug !== originalSlug) {
            do {
                newslug = slugCreate(slug)
                slugcheck = await cardModel.findOne({ slug: newslug });
            } while (slugcheck)
        }
        const card = await cardModel.findOneAndUpdate(
            { authId: result.decoded.id },
            { name, bio, headline, email, slug: newslug },
            { returnDocument: "after", upsert: true }
        );
        return res.status(200).send({
            success: true,
            message: "Basic Created"
        });
    } catch (err) {
        if (err.name === "ValidateError") {
            return res.status(400).send({
                success: false,
                under: true,
                type: err.type,
                message: err.message
            });
        }
        const result = tokenerr(err, "FirstTake Error:");
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        });
    }
};


exports.Second = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const { phone, check } = req.body
        const exist = await cardModel.findOne({ authId: result.decoded.id });
        let phno = null, image = null, id = null
        const img = req.file
        if (phone) {
            phnocheck(phone)
            phno = phone
        }
        if (img) {
            if (exist.imageId) {
                await deleteImage(exist.imageId)
            }
            const data = await uploadImage(img.buffer);
            image = data.secure_url
            id = data.public_id
        } else if (check) {
            if (exist.imageId) {
                await deleteImage(exist.imageId)
            }
            const exist = await authModel.findById(result.decoded.id).select("-password");
            image = exist.picture
        }
        if (!image){
            if (exist.imageId) {
                await deleteImage(exist.imageId)
            }
        }
        await cardModel.findOneAndUpdate({ authId: result.decoded.id },
            {
                phno,
                image,
                imageId: id
            }
        )
        return res.status(200).send({
            success: true,
            message: "Second Completed"
        });
    } catch (err) {
        if (err.name === "ValidateError") {
            return res.status(400).send({
                success: false,
                under: true,
                type: err.type,
                message: err.message
            });
        }
        if (err.name === "CloudinaryError") {
            return res.status(500).send({
                success: false,
                message: err.message
            });
        }
        const result = tokenerr(err, "Second Error:")
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        })
    }
}


exports.Third = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const { telegram, facebook, instagram, linkedin, github, others } = req.body
        const Others = Array.isArray(others) ? others : [];
        const reserved = ["instagram", "facebook", "telegram", "linkedin", "github"];
        for (let i = 0; i < Others.length; i++) {
            const platform = Others[i].platform.trim().toLowerCase();
            if (reserved.includes(platform)) {
                return res.status(400).send({
                    success: false,
                    under: true,
                    type: Others[i].platform,
                    message: `${Others[i].platform} is already a default social platform.`
                });
            }
        }
        for (let i = 0; i < Others.length; i++) {
            for (let j = i + 1; j < Others.length; j++) {
                if (Others[i].platform.trim().toLowerCase() === Others[j].platform.trim().toLowerCase()) {
                    return res.status(400).send({
                        success: false,
                        under: true,
                        message: `Duplicate platform "${Others[i].platform}" is not allowed.`
                    });
                }
            }
        }
        await cardModel.findOneAndUpdate({ authId: result.decoded.id },
            {
                telegram: telegram ?? null,
                facebook: facebook ?? null,
                instagram: instagram ?? null,
                linkedin: linkedin ?? null,
                github: github ?? null,
                others: Others
            }
        )
        return res.status(200).send({
            success: true,
            message: "Third Completed"
        });
    } catch (err) {
        const result = tokenerr(err, "Third Error:")
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        })
    }
}


exports.Final = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const { theme, layout, isPublic } = req.body
        await cardModel.findOneAndUpdate({ authId: result.decoded.id },
            { theme, layout, isPublic }
        )
        return res.status(200).send({
            success: true,
            message: "Final Completed"
        });
    } catch (err) {
        const result = tokenerr(err, "Final Error:")
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        })
    }
}


exports.Getprofile = async (req, res) => {
    try {
        const { slug } = req.body;
        const exist = await cardModel.findOne({ slug }).select("-_id -__v -createdAt -updatedAt -imageId");
        if (!exist) {
            return res.status(404).send({
                success: false,
                message: "Sorry! No profile found."
            });
        }
        if (exist.isPublic) {
            return res.status(200).send({
                success: true,
                Card: exist
            });
        }
        try {
            const result = tokencheck(req.headers.authorization);
            if (result.success && String(result.decoded.id) === String(exist.authId)) {
                return res.status(200).send({
                    success: true,
                    Card: exist
                });
            }
        } catch (err) { }
        return res.status(403).send({
            success: false,
            message: "Sorry! This profile is private."
        });
    } catch (err) {
        console.error("GetProfile:", err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong."
        });
    }
};


exports.Visible = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const exist = await cardModel.findOne({ authId: result.decoded.id });
        const isPublic = !exist.isPublic;
        await cardModel.findOneAndUpdate({ authId: result.decoded.id }, { isPublic });
        return res.status(200).send({
            success: true,
            message: isPublic ? "Identity is now public" : "Identity is now private",
            isPublic
        });
    } catch (err) {
        const result = tokenerr(err, "Status Error:");
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        });
    }
};


exports.Delete = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const exist = await cardModel.findOne({ authId: result.decoded.id });
        if (!exist) {
            return res.status(404).send({
                success: false,
                message: "No Card is created"
            });
        }
        if (exist?.imageId) {
            await deleteImage(exist.imageId)
        }
        await cardModel.deleteOne({ authId: result.decoded.id });
        return res.status(200).send({
            success: true,
            message: "Profile Removed"
        });
    } catch (err) {
        const result = tokenerr(err, "Deletion Error:");
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        });
    }
};