const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const authController = require("../controllers/auth.controller");
const router = new express.Router();

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE,
    PORT,
    HOST
} = process.env;

router.post("/sign-up", authController.signUp, authController.signIn);
router.post("/sign-in", authController.signIn);
router.post("/sign-out", authenticationMiddleware(), authController.signOut);
router.post("/send-password-link", authController.sendPasswordLink);
router.get("/forgot-password/:userId/:token", authController.forgotPassword);
router.post("/rest-password/:userId/:token", authController.resetPassword);

module.exports = router;




