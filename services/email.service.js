
const EMAIL_USERNAME = process.env.EMAIL_USERNAME
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
    }
})

class service {

    async sendEmail(payload) {

    }
}

module.exports = new service()