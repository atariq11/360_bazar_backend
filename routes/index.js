const express = require('express');
const router = express.Router();


const authenticationMiddleware = require("../middlewares/authentication.middleware");

const auth = require('./auth.router');
const users = require('./users.router');
const promoCodes = require('./promoCodes.router');
const rolesCodes = require('./roles.router');


router.use('/auth', auth);
router.use('/users', authenticationMiddleware(), users);
router.use('/roles', rolesCodes); //authenticationMiddleware(), 
router.use('/promo-codes', authenticationMiddleware(), promoCodes);


module.exports = router;
