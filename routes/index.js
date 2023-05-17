const express = require('express');
const router = express.Router();


const auth = require('./auth.router');
const users = require('./users.router');
const promoCodes = require('./promoCodes.router');

router.use('/auth', auth);
router.use('/users', users);
router.use('/promo-codes', promoCodes);


module.exports = router;
