const validator = require("validator");
const bcrypt = require("bcrypt");

const Namecheck = (name) => {
    if (!validator.isAlpha(name.replace(/\s/g, ""))) {
        const err = new Error("Only alphabets are allowed in name.");
        err.name = "ValidateError";
        throw err;
    }
};

const EmailCheck = (email) => {
    if (!validator.isEmail(email)) {
        const err = new Error("Email is not valid.");
        err.name = "ValidateError";
        throw err;
    }
}

const Passcreate = (password) => {
    if (!validator.isStrongPassword(password)) {
        const err = new Error("Create a stronger password.");
        err.name = "ValidateError";
        throw err;
    }
}

const SecuringPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const Passcheck = async (password, hashedPassword) => {
    const ispassMatch = await bcrypt.compare(password, hashedPassword);
    if (!ispassMatch) {
        const err = new Error("Password Incorrect")
        err.name = "ValidateError";
        throw err;
    }
};

module.exports = { Namecheck, EmailCheck, Passcreate, SecuringPassword, Passcheck };