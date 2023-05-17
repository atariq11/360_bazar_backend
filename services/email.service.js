const nodemailer = require('nodemailer');
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
    }
})

class service {

    async sendEmail(payload) {
        const { to, subject, text } = payload;
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            text
        }

        const success = await transporter.sendMail(mailOptions).catch(error => {
            console.log("sendMail error:", error);
            return false
        }).then(info => {
            console.log("Email sent", info.response);
            return true;
        });
        return success;
    }
}

module.exports = new service()
