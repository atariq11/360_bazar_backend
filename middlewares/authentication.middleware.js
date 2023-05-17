const { line } = require('../services/app.service');
const { checkAuthentication } = require('../services/auth.service');
const log = console.log;

function middleware() {

    return async (req, res, next) => {

        req.user || (req.user = {});
        try {
            req.user.authUser = await checkAuthentication(req.headers);
        } catch (error) {
            log(line().str, error.message);
            return next(error);
        }

        next();
    }

}

module.exports = middleware;
