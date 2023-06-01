

const joi = require('joi');
const usersModel = require('../models/users.model');


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
