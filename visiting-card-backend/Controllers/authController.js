const { OAuth2Client } = require("google-auth-library")
const jwt = require("jsonwebtoken")
const authModel = require("../Models/authModel")
const verifyModel = require("../Models/verifyModel")
const cardModel = require("../Models/cardModels")
const { EmailCheck, Namecheck, Passcheck, Passcreate, Passvalidate, tokencheck, tokenerr } = require("../Utility/Customwork")
const { OtpVerificationMail } = require("../Utility/OtpVerificationMail")
const { loginSuccessMail } = require("../Utility/loginSuccessMail")
const { passwordUpdatedMail } = require("../Utility/passupdatemail")
const { accountDeletedMail } = require("../Utility/deletionMail")
const { deleteImage } = require("../Utility/Upload");


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
        loginSuccessMail(exist.email, exist.name)
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
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const exist = await authModel.findById(result.decoded.id).select("-password");
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
        const result = tokenerr(err, "Activesession Error:")
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        })
    }
};


exports.Verify = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        EmailCheck(email)
        if (name) {
            Passcheck(password)
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
            const hashedPassword = await Passcreate(password);
            const { sent, otp, otpExpiry } = await OtpVerificationMail(email, name);
            if (!sent) {
                return res.status(500).json({
                    success: false,
                    message: "Unable to send verification email."
                });
            }
            await verifyModel.findOneAndUpdate({ email },
                {
                    name,
                    password: hashedPassword,
                    otp,
                    otpExpiry
                },
                { upsert: true }
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
        await Passvalidate(password, exist.password, exist.name, exist.email);
        const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        loginSuccessMail(exist.email, exist.name)
        return res.status(200).json({
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
            return res.status(400).json({
                success: false,
                message: "OTP Error Ask Again",
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
        loginSuccessMail(add.email, add.name)
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


exports.ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        EmailCheck(email)
        const exist = await authModel.findOne({ email }).select("-password");
        if (!exist) {
            return res.status(404).send({
                sucess: false,
                message: "User with this email do not exist"
            })
        }
        if(exist.authProvider==="Google"){
            return res.status(404).send({
                sucess: false,
                message: "This account was registered using Google. Forget Password is not allowed."
            })
        }
        const { sent, otp, otpExpiry } = await OtpVerificationMail(exist.email, exist.name);
        if (!sent) {
            return res.status(500).json({
                success: false,
                message: "Unable to send verification email."
            });
        }
        await verifyModel.findOneAndUpdate({ email: exist.email },
            {
                name: exist.name,
                otp,
                otpExpiry
            },
            { upsert: true }
        );
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
            email
        });
    } catch (err) {
        if (err.name === "ValidateError") {
            return res.status(400).json({
                success: false,
                under: true,
                message: err.message
            });
        }
        console.error("Reset Check Error:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
}


exports.OtpVerfiy = async (req, res) => {
    try {
        const { email, otp } = req.body
        const exist = await verifyModel.findOne({ email });
        if (new Date() > exist.otpExpiry || exist.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "OTP Error Ask Again",
            });
        }
        return res.status(200).send({
            success: true,
            email
        })
    } catch (err) {
        console.error("OTP check Error", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
}


exports.PasswordReset = async (req, res) => {
    try {
        const { password, confirm, email } = req.body
        const exist = await verifyModel.findOne({ email });
        Passcheck(password)
        if (!(password === confirm)) {
            return res.status(400).json({
                success: false,
                message: "Password doesnot match",
            });
        }
        const hashedPassword = await Passcreate(password);
        const add = await authModel.findOneAndUpdate({ email: exist.email }, { password: hashedPassword })
        await verifyModel.deleteOne({ email });
        passwordUpdatedMail(add.email, add.name)
        return res.status(200).send({
            success: true,
            message: "Password Updated Successfully"
        })
    } catch (err) {
        if (err.name === "ValidateError") {
            return res.status(400).json({
                success: false,
                under: true,
                message: err.message
            });
        }
        console.error("Password Reset", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
}


exports.Delete = async (req, res) => {
    try {
        const result = tokencheck(req.headers.authorization);
        if (!result.success) {
            return res.status(401).send(result);
        }
        const exist = await authModel.findById(result.decoded.id);
        if (!exist) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        const final = await cardModel.findOneAndDelete({ authId: result.decoded.id });
        await authModel.findByIdAndDelete(result.decoded.id);
        if (final.imageId) {
            await deleteImage(final.imageId)
        }
        accountDeletedMail(exist.email, exist.name)
        return res.status(200).send({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (err) {
        const result = tokenerr(err, "Deletion Error:");
        return res.status(result.status).send({
            success: result.success,
            message: result.message
        });
    }
};