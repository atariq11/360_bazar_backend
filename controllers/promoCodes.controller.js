const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require('joi');
const { checkAuthentication, checkServiceAccount } = require('../services/auth.service');
const jwtService = require('../services/jwt.service');
const emailService = require('../services/email.service');
const usersModel = require('../models/users.model');
const promoModel = require('../models/promoCodes.model');
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const router = new express.Router();

class controller {
    async add(req, res) {

        const schema = joi.object().keys({
            userId: joi.string().required(),
            code: joi.string().required()
        });

        const foundError = schema.validate(req.body).error;

        if (foundError) {
            return res.status(200).json({
                success: false,
                message: `Invalid payload: ${foundError.message}`
            });
        }

        const { code, userId } = req.body;

        let foundData = await promoModel.findOne({ userId, code });

        if (foundData) {
            return res.status(200).json({
                success: false,
                message: "Record is already exist",
                data: foundData
            });
        }

        const newData = await promoModel.create(req.body);

        return res.status(200).json({
            success: true,
            message: "Success",
            data: newData
        });
    }

    async get(req, res) {

        const schema = joi.object().keys({
            userId: joi.string().optional(),
            code: joi.string().optional()
        });

        const foundError = schema.validate(req.query).error;

        if (foundError) {
            return res.status(200).json({
                success: false,
                message: `Invalid payload: ${foundError.message}`
            });
        }

        const foundData = await promoModel.find(req.query).populate(["user"]);

        return res.status(200).json({
            success: true,
            message: "Success",
            data: foundData
        });
    }
}
module.exports = new controller();
