const transporter = require("../Config/NodemailConnection");

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"NexLink<noreply.gmail.com>" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("Email sent:", info.messageId);

        return true;
    } catch (error) {
        console.error("Email Error:", error.message);
        return false;
    }
};

module.exports = sendEmail;

// app.get("/mail", async (req, res) => {

//     const sent = await sendEmail({
//         to: "21.xiia.niketaggarwal@gmail.com",
//         subject: "Welcome to NexLink 🚀",
//         html: `
//             <h1>Welcome to NexLink</h1>
//             <p>Your email service is working successfully.</p>
//         `
//     });

//     if (sent) {
//         return res.json({
//             success: true,
//             message: "Email Sent Successfully"
//         });
//     }

//     res.status(500).json({
//         success: false,
//         message: "Email Failed"
//     });

// });