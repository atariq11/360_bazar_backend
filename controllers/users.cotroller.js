


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
const router = new express.Router();

class controller {

    async getSelfDetails(req, res) {

        const schema = joi.object().keys({
            title: joi.string().optional(),
            code: joi.string().optional()
        });
        console.log("get roles", req.query);
        const foundError = schema.validate(req.query).error;

        if (foundError) {
            return res.status(200).json({
                success: false,
                message: `Invalid payload: ${foundError.message}`
            });
        }

        const foundData = await usersModel.findById(req.user.authUser.userId).populate("role");

        return res.status(200).json({
            success: true,
            message: "Success",
            data: foundData
        });
    }
}

module.exports = new controller();
