const sendEmail = require("./SendMail")

const OtpVerificationMail = async (email, name) => {

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

module.exports = { OtpVerificationMail };