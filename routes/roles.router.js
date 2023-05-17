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


router.post("/", async (req, res) => {

    const schema = joi.object().keys({
        title: joi.string().required(),
        code: joi.string().required()
    });

    const foundError = schema.validate(req.body).error;

    if (foundError) {
        return res.status(200).json({
            success: false,
            message: `Invalid payload: ${foundError.message}`
        });
    }

    const { code } = req.body;

    const foundData = await rolesModel.findOne({ code });

    if (foundData) {
        return res.status(200).json({
            success: false,
            message: "Record is already exist",
            data: foundData
        });
    }

    const newData = await rolesModel.create(req.body);

    return res.status(200).json({
        success: true,
        message: "Success",
        data: newData
    });
});

router.get("/", async (req, res) => {

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

    const foundData = await rolesModel.find(req.query);

    return res.status(200).json({
        success: true,
        message: "Success",
        data: foundData
    });
});


module.exports = router
