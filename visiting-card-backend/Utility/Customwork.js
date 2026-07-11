const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { IncorrectPasswordMail } = require("./IncorrectPass")

const Namecheck = (name) => {
    if (!validator.isAlpha(name.replace(/\s/g, ""))) {
        const err = new Error("Only alphabets are allowed in name.");
        err.name = "ValidateError";
        err.type = "name";
        throw err;
    }
};

const EmailCheck = (email) => {
    if (!validator.isEmail(email)) {
        const err = new Error("Email is not valid.");
        err.name = "ValidateError";
        err.type = "email";
        throw err;
    }
}

const Passcheck = (password) => {
    if (!validator.isStrongPassword(password)) {
        const err = new Error("Create a stronger password.");
        err.name = "ValidateError";
        err.type = "password";
        throw err;
    }
}

const Passcreate = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const Passvalidate = async (password, hashedPassword, name, email) => {
    const ispassMatch = await bcrypt.compare(password, hashedPassword);
    if (!ispassMatch) {
        await IncorrectPasswordMail(email, name)
        const err = new Error("Password Incorrect")
        err.name = "ValidateError";
        err.type = "password";
        throw err;
    }
};

const tokencheck = (authHeader) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            success: false,
            message: "Token Missing"
        }
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, decoded }
}

const tokenerr = (err, part) => {
    if (err.name === "TokenExpiredError") {
        return {
            success: false,
            status: 400
        }
    }
    if (err.name === "JsonWebTokenError") {
        return {
            success: false,
            message: "Invalid Token",
            status: 401
        }
    }
    console.error(part, err)
    return {
        success: false,
        message: "Something went wrong.",
        status: 500
    }
}

module.exports = { Namecheck, EmailCheck, Passcreate, Passvalidate, Passcheck, tokencheck, tokenerr };