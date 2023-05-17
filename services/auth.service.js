const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const bcrypt = require("bcryptjs");
const { line } = require('./app.service'); 
const usersModel = require('../models/users.model');
const log = console.log;

class service {
    constructor() {
        this.checkAuthentication = this.checkAuthentication.bind(this)
        this.checkServiceAccount = this.checkServiceAccount.bind(this)
    }

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
                const serviceAccount = await this.checkServiceAccount({ username, password });
                return { ...serviceAccount, isServiceAccount: true };
            } catch (error) {

                const responseMessage = "Invalid basic token.";
                log(line().str, responseMessage, error.message);
                throw new Error(responseMessage);
            }
        }

    }

    async checkServiceAccount(payload) {
        const { email, password } = payload;

        const foundUser = await usersModel.findOne({ email }).populate('role');

        if (!foundUser) {
            throw new Error("User not found")
        }

        const passwordMatched = await bcrypt.compare(password, foundUser.password);

        if (!passwordMatched) {
            throw new Error("Invalid password")
        }

        return foundUser;
    }


}

module.exports = new service();
