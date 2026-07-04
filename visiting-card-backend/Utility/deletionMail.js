const sendEmail = require("./SendMail")

const accountDeletedMail = async (email, name) => {

    await sendEmail({
        to: email,
        subject: "Your NexLink Account Has Been Deleted",
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
                This email confirms that your
                <strong>NexLink account has been permanently deleted.</strong>
            </p>

            <div style="
                margin:25px 0;
                padding:18px;
                background:#f5f7ff;
                border-left:5px solid #2563eb;
                border-radius:6px;">

                <strong>Account:</strong> ${email}<br>
                <strong>Deleted On:</strong> ${new Date().toLocaleString()}
            </div>

            <p>
                All associated authentication data has been removed from our system.
            </p>

            <p>
                If you deleted your account intentionally, no further action is required.
            </p>

            <p style="color:#d32f2f;">
                If you did <strong>not</strong> request this deletion, please contact our support team immediately.
            </p>

            <br>

            <p style="color:gray;font-size:13px;">
                Thank you for being a part of NexLink.
            </p>

            <p style="color:gray;font-size:13px;">
                © NexLink • One Identity. Infinite Connections.
            </p>

        </div>
        `
    });
};

module.exports = { accountDeletedMail };