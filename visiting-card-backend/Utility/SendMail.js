const transporter = require("../Config/NodemailConnection");

const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"NexLink <noreply@nexlink.com>" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });
        return true;
    } catch (err) {
        console.error("Email Error:", err);
        return false;
    }
};

module.exports = sendEmail;