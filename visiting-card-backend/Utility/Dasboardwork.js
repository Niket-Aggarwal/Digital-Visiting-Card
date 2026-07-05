const validator = require("validator");
const crypto = require("crypto");

const slugCreate = (slug) => {
    const suffix = crypto.randomBytes(3).toString("hex");
    return `${slug}-${suffix}`;
};

const phnocheck = (phno) => {
    if (!validator.isMobilePhone(phone, "en-IN")) {
        const err = new Error("Not a valid Phone Number");
        err.name = "ValidateError";
        throw err;
    }
};

module.exports = { slugCreate ,phnocheck};