// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const joi = require('joi');
const promoModel = require('../models/promoCodes.model');
const promoCodeRedeems = require('../models/promoCodeRedeems.model');
// const authenticationMiddleware = require("../middlewares/authentication.middleware");
const appService = require("../services/app.service");
// const router = new express.Router();


class controller {

    async addOrFetch(req, res) {

        const schema = joi.object().keys({
            userId: joi.string().required()
        });

        const foundError = schema.validate(req.params).error;

        if (foundError) {
            return res.status(200).json({
                success: false,
                message: `Invalid payload: ${foundError.message}`
            });
        }

        const { userId } = req.params;

        const code = appService.getCode();

        let foundData = await promoModel.findOne({ userId });

        if (foundData) {
            return res.status(200).json({
                success: true,
                message: "Success",
                data: foundData
            });
        }

        const newData = await promoModel.create({ code, userId });

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

    async redeemPromoCode(req, res) {

        const schema = joi.object().keys({
            userId: joi.string().required(),
            codeId: joi.string().required(),
            code: joi.string().required()
        }).xor("codeId", "code");

        const foundError = schema.validate(req.body).error;

        if (foundError) {
            return res.status(200).json({
                success: false,
                message: `Invalid payload: ${foundError.message}`
            });
        }

        const { codeId, code, userId } = req.body;

        let foundCode = await promoModel.findOne({ id: codeId, code });
        if (!foundCode) {
            return res.status(200).json({
                success: false,
                message: "Promo code not found.",
                data: foundData
            });
        }

        if (foundCode.userId === userId) {
            return res.status(200).json({
                success: false,
                message: "You can't redeem your own promo code.",
                data: foundData
            });
        }

        let foundData = await promoCodeRedeems.findOne({ userId, codeId });

        if (foundData) {
            return res.status(200).json({
                success: false,
                message: "You already reedem this promo code.",
                data: foundData
            });
        }

        const newData = await promoCodeRedeems.create(req.body);

        return res.status(200).json({
            success: true,
            message: "Success",
            data: newData
        });
    }
}
module.exports = new controller();
