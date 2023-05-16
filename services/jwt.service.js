
const jwt = require('jsonwebtoken');
const { line } = require('./app.service');
const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    BILLING_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE
} = process.env;

const log = console.log;

class service {

    async genTokenByRefreshToken(payload) {
        const { refreshToken } = payload;

        const { iat, exp, ...decodedPayload } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign(decodedPayload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });

        return { accessToken, refreshToken, ...decodedPayload };
    }

    async genToken(payload) {
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE });

        return { accessToken, refreshToken, ...payload };
    }

    genBillingToken(payload) {
        const token = jwt.sign(payload, BILLING_TOKEN_SECRET);
        return token;
    }

    validateBillingToken(orderToken) {

        try {
            return jwt.verify(orderToken, BILLING_TOKEN_SECRET);
        } catch (error) {
            const responseMessage = "Invalid orderId token.";
            log(line().str, responseMessage, error.message);
            throw new Error(responseMessage);
        }
    }
}

module.exports = new service();
