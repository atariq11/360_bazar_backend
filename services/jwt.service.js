
const jwt = require('jsonwebtoken');
const { line } = require('./app.service');
const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE,
    GENERIC_TOKEN_SECRET
} = process.env;

const log = console.log;

class service {

    async genTokenByRefreshToken(payload) {
        const { refreshToken } = payload;

        const { iat, exp, ...decodedPayload } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign(decodedPayload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });

        return { ...decodedPayload, accessToken, refreshToken };
    }

    async genToken(payload, expiresIn) {
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiresIn || ACCESS_TOKEN_LIFE });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE });

        return { ...payload, accessToken, refreshToken };
    }


    async getToken(payload, expiresIn) {
        const token = jwt.sign(payload, GENERIC_TOKEN_SECRET, { expiresIn });

        return { ...payload, token };
    }
}

module.exports = new service();
