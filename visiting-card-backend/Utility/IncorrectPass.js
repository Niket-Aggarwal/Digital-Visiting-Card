const sendEmail = require("./SendMail");

const IncorrectPasswordMail = async (email, name) => {

    const time = new Date().toLocaleString();

    await sendEmail({
        to: email,
        subject: "Security Alert - Incorrect Password Attempt",
        html: `
        <div style="
            max-width:600px;
            margin:auto;
            font-family:Arial,sans-serif;
            background:#ffffff;
            padding:30px;
            border-radius:10px">
            <div style="text-align:center">
                <img
                    src="${process.env.MAIL_IMG}"
                    alt="NexLink"
                    width="180"
                    style="display:block; margin:auto;"
                />
                <h1 style="color:#2563eb;">
                    NexLink — Next Generation Digital Identity
                </h1>
            </div>
            <hr>
            <h2>Hello ${name} 👋</h2>
            <p>
                We detected an unsuccessful login attempt on your NexLink account because an incorrect password was entered.
            </p>
            <div style="
                background:#f8f9fa;
                border-left:5px solid #2563eb;
                padding:15px;
                margin:25px 0;
                border-radius:6px;">
                <p style="margin:0;">
                    <strong>Time:</strong> ${time}
                </p>
                <p style="margin-top:10px;">
                    <strong>Status:</strong>
                    Incorrect password entered.
                </p>
            </div>
            <p>
                <strong>If this was you</strong>, you can safely ignore this email.
            </p>
            <p>
                <strong>If this wasn't you</strong>, we recommend resetting your password immediately to keep your account secure.
            </p>
            <p style="
                background:#fff3cd;
                padding:15px;
                border-radius:8px;
                color:#856404;">
                🔒 Never share your password or OTP with anyone. NexLink will never ask for your password through email.
            </p>
            <br>
            <p style="color:gray;font-size:13px;">
                © NexLink • One Identity. Infinite Connections.
            </p>
        </div>
        `
    });
};

module.exports = { IncorrectPasswordMail };