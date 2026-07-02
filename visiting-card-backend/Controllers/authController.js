const authModel = require("../Models/authModel")

exports.Base = async (req, res) => {
    res.status(200).send({
        Title: "NexLink",
        Tagline: "Next Generation Digital Identity",
        message: "This is Auth Base Url"
    });
}