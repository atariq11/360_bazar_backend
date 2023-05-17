const { line } = require('../services/app.service');
const log = console.log;

function middleware() {

    return (error, req, res, next) => {
        log(line().str, error.message);
        log(line().str, "error express middleware", error.message);
        const message = error.nativeError ? error.nativeError.sqlMessage : error.message;
        res.status(200).json({
            success: false,
            message: message,
            data: {}
        });
    }

}

module.exports = middleware;
