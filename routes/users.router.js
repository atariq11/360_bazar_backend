const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require('joi');
const { checkAuthentication, checkServiceAccount } = require('../services/auth.service');
const jwtService = require('../services/jwt.service');
const emailService = require('../services/email.service');
const usersModel = require('../models/users.model');
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const usersCotroller = require("../controllers/users.cotroller");
const router = new express.Router();


router.get("/self", authenticationMiddleware(), usersCotroller.getSelfDetails);

module.exports = router;
