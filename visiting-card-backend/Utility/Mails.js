const sendEmail = require("./SendMail");

const sendVerificationOTP = async (email, name) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const sent = await sendEmail({
        to: email,
        subject: "Verify your NexLink Account",
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
                    src="https://nexlinkdigitalidentity.vercel.app/Logo.png"
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
                Welcome to NexLink!
            </p>
            <p>
                Use the following OTP to verify your account.
            </p>
            <div style="
                margin:30px auto;
                width:220px;
                text-align:center;
                background:#2563eb;
                color:white;
                font-size:34px;
                font-weight:bold;
                letter-spacing:10px;
                padding:15px;
                border-radius:8px;">
                ${otp}
            </div>
            <p>
                This OTP will expire in
                <strong>5 minutes.</strong>
            </p>
            <p>
                Never share this OTP with anyone.
            </p>
            <br>
            <p style="color:gray;font-size:13px;">
                © NexLink • One Identity. Infinite Connections.
            </p>
        </div>
        `
    });
    return { sent, otp, otpExpiry };
};

const loginSuccessMail = async (email, name) => {
    await sendEmail({
        to: email,
        subject: "Successful Login • NexLink",
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
                    src="https://nexlinkdigitalidentity.vercel.app/Logo.png"
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
                Your NexLink account has been
                <strong>successfully signed in.</strong>
            </p>
            <div style="
                margin:25px 0;
                padding:18px;
                background:#f5f7ff;
                border-left:5px solid #2563eb;
                border-radius:6px;">
                <strong>Account:</strong> ${email}<br>
                <strong>Time:</strong> ${new Date().toLocaleString()}
            </div>
            <p>
                If this login was made by you, no further action is required.
            </p>
            <p style="color:#d32f2f;">
                If you did <strong>not</strong> sign in, please change your password immediately.
            </p>
            <br>
            <p style="color:gray;font-size:13px;">
                Thank you for choosing NexLink.
            </p>
            <p style="color:gray;font-size:13px;">
                © NexLink • One Identity. Infinite Connections.
            </p>
        </div>
        `
    });
};

module.exports = { loginSuccessMail, sendVerificationOTP };