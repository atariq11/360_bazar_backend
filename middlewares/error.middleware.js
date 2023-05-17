const jwt = require("jsonwebtoken");
const { line } = require('../services/app.service');
const log = console.log;

function middleware() {

    return async (req, res, next) => {
        try {
           await next();
        } catch (error) {

            log(line().str, "error middleware", error.message);
            const message = error.nativeError ? error.nativeError.sqlMessage : error.message;
            res.json({
                success: false,
                message: message,
                data: {}
            });
        }

    }

}

module.exports = middleware;
