const authModel = require("../Models/authModel")
const cardModel = require("../Models/cardModels")
const { EmailCheck, Namecheck, tokencheck, tokenerr } = require("../Utility/Customwork")
const { slugCreate, phnocheck } = require("../Utility/Dasboardwork")


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
        const exist = await cardModel.findOne({ authId: result.decoded.id }).select("-_id -__v -createdAt -updatedAt -authId");
        if (!exist) {
            return res.status(200).json({
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


exports.FirstTake = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const { name, headline, bio, email, slug } = req.body
        EmailCheck(email)
        Namecheck(name)
        let newslug, exist;
        do {
            newslug = slugCreate(slug)
            exist = await cardModel.findOne({ slug: newslug });
        } while (exist)
        const Card = await cardModel.create({
            authId: result.decoded.id,
            name, bio, headline, email,
            slug: newslug,
        })
        return res.status(200).send({
            success: true,
            message: "Basic Created"
        })
    } catch (err) {
        if (err.name === "ValidateError") {
            return res.status(400).json({
                success: false,
                under: true,
                message: err.message
            });
        }
        const result = tokenerr(err, "FirstTake Error:")
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        })
    }
}


exports.Firstupdate = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const { name, headline, bio, email, slug } = req.body
        const exist = await cardModel.findOne({ authId: result.decoded.id });
        const originalSlug = exist.slug.split("-")[0];
        if (name) {
            EmailCheck(email)
            Namecheck(name)
            let newslug = exist.slug, slugcheck;
            if (slug !== originalSlug) {
                do {
                    newslug = slugCreate(slug)
                    slugcheck = await cardModel.findOne({ slug: newslug });
                } while (slugcheck)
            }
            await cardModel.findOneAndUpdate({ authId: result.decoded.id },
                { name, headline, bio, slug: newslug, email }
            );
            return res.status(200).send({
                success: true,
                message: "Basic Updated"
            })
        }
        const data = {
            name: exist.name,
            email: exist.email,
            bio: exist.bio,
            headline: exist.headline,
            slug: originalSlug
        }
        return res.status(200).send({
            success: true,
            data
        })
    } catch (err) {
        if (err.name === "ValidateError") {
            return res.status(400).json({
                success: false,
                under: true,
                message: err.message
            });
        }
        const result = tokenerr(err, "FirstUpdate Error:")
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        })
    }
}


exports.Getprofile = async (req, res) => {
    try {
        const { slug } = req.body
        const exist = await cardModel.findOne({ slug: slug }).select("-_id -__v -createdAt -updatedAt -authId");
        if (!exist) {
            return res.status(404).json({
                success: false,
                message: "Sorry! No profile Found"
            });
        }
        if (!exist.isPublic) {
            return res.status(404).json({
                success: false,
                message: "Sorry! this profile is private"
            });
        }
        return res.status(200).send({
            success: true,
            Card: exist
        });
    } catch (err) {
        console.error('GetProfile:', err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
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