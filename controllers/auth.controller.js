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

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE,
    PORT,
    HOST
} = process.env;

class controller {

    async signUp(req, res, next) {

        await Promise.resolve().then(async () => {

            const schema = joi.object().keys({
                fullName: joi.string().required(),
                email: joi.string().required(),
                password: joi.string().required(),
                roleId: joi.string(),
                roleCode: joi.string()
            }).xor("roleId", "roleCode");

            const foundError = schema.validate(req.body).error;

            if (foundError) {
                return res.status(200).json({
                    success: false,
                    message: `Invalid payload: ${foundError.message}`
                });
            }

            const { fullName, email, password, roleId, roleCode } = req.body;

            const foundUser = await usersModel.findOne({ email }).populate("role");

            if (foundUser) {
                return res.status(200).json({
                    success: false,
                    message: "This User is Already Exist",
                    data: foundUser
                });
            }

            console.log(roleId, roleCode);
            const foundRole = await rolesModel.findOne({ id: roleId, code: roleCode });

            if (!foundRole) {
                return res.status(200).json({
                    success: false,
                    message: `Invalid role`
                });
            }

            const newUser = await usersModel.create({ fullName, email, password, roleId: foundRole.id });

            // return res.status(200).json({
            //     success: true,
            //     message: "User Registered Successfully",
            //     data: newUser
            // });

            req.body = { email, password }

            next()

        }).catch(next)
    }

    async signIn(req, res, next) {
        await Promise.resolve().then(async () => {

            const schema = joi.object().keys({
                email: joi.string().required(),
                password: joi.string().required()
            });

            const foundError = schema.validate(req.body).error;

            if (foundError) {
                return res.status(200).json({
                    success: false,
                    message: `Invalid payload: ${foundError.message}`
                });
            }


            const { email, password } = req.body;
            const foundUser = await checkServiceAccount({ email, password });
            const { _id: userId, role } = foundUser;
            const { _id: roleId, code: roleCode } = role;
            // token generate
            const { accessToken, refreshToken } = await jwtService.genToken({ userId, email, roleId, roleCode });

            // cookiegenerate
            res.cookie("userAccessToken", accessToken, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            });

            res.cookie("userRefreshToken", refreshToken, {
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            });

            res.status(200).json({
                success: true,
                message: "Success",
                data: {
                    accessToken,
                    refreshToken,
                    user: foundUser
                }
            })
        }).catch(next)
    }

    async signOut(req, res, next) {
        await Promise.resolve().then(async () => {
            res.clearCookie("userAccessToken", { path: "/" });
            res.clearCookie("userRefreshToken", { path: "/" });

            res.status(200).json({
                success: true,
                message: "Success",
                data: req.user.authUser
            })
        }).catch(next)
    }

    async sendPasswordLink(req, res, next) {
        await Promise.resolve().then(async () => {

            const schema = joi.object().keys({
                email: joi.string().required()
            });

            const foundError = schema.validate(req.body).error;

            if (foundError) {
                return res.status(200).json({
                    success: false,
                    message: `Invalid payload: ${foundError.message}`
                });
            }

            const { email } = req.body;

            const foundUser = await usersModel.findOne({ email }).populate('role');

            if (!foundUser) {
                return res.status(200).json({
                    success: false,
                    message: `User not found`
                });
            }

            const { _id: userId, role } = foundUser;
            const { _id: roleId, code: roleCode } = role;

            const { accessToken } = await jwtService.genToken({ userId, email, roleId, roleCode }, "120s")

            //const setusertoken = await usersModel.findByIdAndUpdate({ _id: foundUser._id }, { verifytoken: token }, { new: true });

            const sent = await emailService.sendEmail({
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 2 MINUTES http://${HOST}:${PORT}/auth/forgot-password/${foundUser._id}/${accessToken}`
            })

            if (sent) {
                return res.status(200).json({
                    success: true,
                    message: `Email sent`
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: `Email rejected`
                });
            }
        }).catch(next)
    }

    async forgotPassword(req, res, next) {
        await Promise.resolve().then(async () => {
            const schema = joi.object().keys({
                userId: joi.string().required(),
                token: joi.string().required()
            });

            const foundError = schema.validate(req.params).error;

            if (foundError) {
                return res.status(200).json({
                    success: false,
                    message: `Invalid payload: ${foundError.message}`
                });
            }

            const { userId, token } = req.params;

            const authorization = `Bearer ${token}`;
            const authUser = await checkAuthentication({ authorization })
            const foundUser = await usersModel.findOne({ _id: userId });

            if (!foundUser) {
                return res.status(200).json({
                    success: false,
                    message: `User not found`
                });
            }

            return res.status(200).json({
                success: true,
                message: `Success`,
                data: authUser
            });
        }).catch(next)
    }

    async resetPassword(req, res, next) {
        await Promise.resolve().then(async () => {
            const { userId, token } = req.params;
            const { password } = req.body;

            const schema = joi.object().keys({
                userId: joi.string().required(),
                token: joi.string().required(),
                password: joi.string().required()
            });

            const foundError = schema.validate({ userId, token, password }).error;

            if (foundError) {
                return res.status(200).json({
                    success: false,
                    message: `Invalid payload: ${foundError.message}`
                });
            }

            const authorization = `Bearer ${token}`;
            const authUser = await checkAuthentication({ authorization })
            const foundUser = await usersModel.findOne({ _id: userId });

            if (!foundUser) {
                return res.status(200).json({
                    success: false,
                    message: `User not found`
                });
            }

            const updatedUser = await usersModel.findByIdAndUpdate({ _id: userId }, { password });
            return res.status(200).json({
                success: true,
                message: `Success`,
                data: updatedUser
            });
        }).catch(next)
    }
}
module.exports = new controller();
