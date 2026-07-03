const authModel = require("../Models/authModel")
const verifyModel = require("../Models/verifyModel")
const { OAuth2Client } = require("google-auth-library")
const jwt = require("jsonwebtoken")
const { EmailCheck, Namecheck, Passcheck, Passcreate, SecuringPassword } = require("../Utility/Customwork")
const { sendVerificationOTP, loginSuccessMail } = require("../Utility/Mails")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.Base = async (req, res) => {
    res.status(200).send({
        Title: "NexLink",
        Tagline: "Next Generation Digital Identity",
        message: "This is Auth Base Url"
    });
}

exports.GoogleLogin = async (req, res) => {
    try {
        const { credential } = req.body
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();
        let exist = await authModel.findOne({ email: payload.email }).select("-password");
        if (exist) {
            if (exist.authProvider === "Custom") {
                return res.status(400).send({
                    success: false,
                    message: "This account was registered using Email & Password. Please sign in using Email."
                })
            }
        } else {
            exist = await authModel.create({
                name: payload.name,
                email: payload.email,
                authProvider: "Google",
                googleId: payload.sub,
                picture: payload.picture
            })
        }
        const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        await loginSuccessMail(exist.email, exist.name)
        return res.status(200).send({
            success: true,
            user: {
                id: exist._id,
                name: exist.name,
                email: exist.email,
                picture: exist.picture
            },
            token
        });
    } catch (err) {
        console.error("Google Login Error:", err);
        return res.status(500).send({
            success: false,
            message: "Google authentication failed. Try Again!!"
        })
    }
};

exports.ActiveSession = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const exist = await authModel.findById(decoded.id).select("-password");
        if (!exist) {
            return res.status(401).json({
                success: false,
                message: "User Not found"
            });
        }
        return res.status(200).send({
            success: true,
            user: {
                id: exist._id,
                name: exist.name,
                email: exist.email,
                picture: exist.picture
            }
        });
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send({
                success: false,
            });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).send({
                success: false,
                message: "Invalid Token"
            });
        }
        console.error("Activesession:", err)
        return res.status(500).send({
            success: false,
            message: "Something went wrong."
        });
    }
};

exports.Verify = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        EmailCheck(email)
        if (name) {
            Passcreate(password)
            Namecheck(name)
            const exist = await authModel.findOne({ email }).select("-password");
            if (exist) {
                if (exist.authProvider === "Google") {
                    return res.status(400).json({
                        success: false,
                        message: "This account was registered using Google. Please continue with Google Authentication."
                    });
                }
                return res.status(400).json({
                    success: false,
                    under: true,
                    message: "Email already registered."
                });
            }
            const hashedPassword = await SecuringPassword(password);
            const { sent, otp, otpExpiry } = await sendVerificationOTP(email, name);
            if (!sent) {
                return res.status(500).json({
                    success: false,
                    message: "Unable to send verification email."
                });
            }
            await verifyModel.create(
                {
                    name,
                    email,
                    password: hashedPassword,
                    otp,
                    otpExpiry
                }
            );
            return res.status(200).json({
                success: true,
                redirect: true,
                message: "OTP sent successfully.",
                email
            });

        }
        const exist = await authModel.findOne({ email });
        if (!exist) {
            return res.status(404).json({
                success: false,
                message: "Email Invalid"
            });
        }
        if (exist.authProvider === "Google") {
            return res.status(400).json({
                success: false,
                message: "This account was registered using Google. Please continue with Google Authentication."
            });
        }
        await Passcheck(password, exist.password);
        const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        await loginSuccessMail(exist.email, exist.name)
        return res.status(200).json({
            success: true,
            token,
            user: {
                id: exist._id,
                name: exist.name,
                email: exist.email,
                picture: exist.picture
            }
        });
    } catch (err) {
        if (err.name === "ValidateError") {
            return res.status(400).json({
                success: false,
                under: true,
                message: err.message
            });
        }
        console.error("Verify Error:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
};

exports.Register = async (req, res) => {
    try {
        const { email, otp } = req.body
        const exist = await verifyModel.findOne({ email });
        if (new Date() > exist.otpExpiry || exist.otp !== otp) {
            const verifyier = { name: exist.name, email: exist.email }
            await verifyModel.deleteOne({ email });
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP.",
                verifyier
            });
        }
        const add = await authModel.create({
            name: exist.name,
            email: exist.email,
            password: exist.password,
            authProvider: "Custom"
        })
        await verifyModel.deleteOne({ email });
        const token = jwt.sign({ id: add._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        await loginSuccessMail(exist.email, exist.name)
        return res.status(200).send({
            success: true,
            user: {
                id: add._id,
                name: add.name,
                email: add.email,
                picture: add.picture
            },
            token
        })
    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
}