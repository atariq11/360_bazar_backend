const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require('joi');
const { checkAuthentication, checkServiceAccount } = require('../services/auth.service');
const jwtService = require('../services/jwt.service');
const emailService = require('../services/email.service');
const usersModel = require('../models/users.model');
const rolesModel = require('../models/roles.model');
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const rolesController = require("../controllers/roles.controller");
const router = new express.Router();


router.post("/", rolesController.add);
router.get("/", rolesController.get);

module.exports = router
