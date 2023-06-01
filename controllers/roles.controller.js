const express = require("express");
const joi = require('joi');
const rolesModel = require('../models/roles.model');


class controller {
    async add(req, res) {

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
    }

    async get(req, res) {

        const schema = joi.object().keys({
            title: joi.string().optional(),
            code: joi.string().optional()
        });

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
    }
}
module.exports = new controller();
