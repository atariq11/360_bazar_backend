const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { line } = require('./app.service');
const authService = require('../routes/auth/auth.service');
const log = console.log;

class service {

    async checkAuthentication({ authorization }) {
        if (!authorization) {
            const responseMessage = "authorization header is required.";
            log(line().str, responseMessage);
            throw new Error(responseMessage);
        }

        // log(line().str, "secret:", ACCESS_TOKEN_SECRET);
        // log(line().str, "authorization:", authorization);

        const [tokenType, tokenHash] = authorization.split(" ");
        if (!["Basic", "Bearer"].includes(tokenType)) {
            const responseMessage = "Invalid token type, it should be 'Basic' or 'Bearer'";
            log(line().str, responseMessage);
            throw new Error(responseMessage);
        }

        if (tokenType == "Bearer") {
            try {
                const decoded = jwt.verify(tokenHash, ACCESS_TOKEN_SECRET);
                return { ...decoded, isServiceAccount: false };
            } catch (error) {
                const responseMessage = "Invalid bearer token.";
                log(line().str, responseMessage, error.message);
                throw new Error(responseMessage);
            }
        } else {
            try {
                const [username, password] = Buffer.from(tokenHash, 'base64').toString("utf8").split(":");
                const serviceAccount = await authService.checkServiceAccount({ username, password });
                return { ...serviceAccount, isServiceAccount: true };
            } catch (error) {

                const responseMessage = "Invalid basic token.";
                log(line().str, responseMessage, error.message);
                throw new Error(responseMessage);
            }
        }

    }


}

module.exports = new service();
