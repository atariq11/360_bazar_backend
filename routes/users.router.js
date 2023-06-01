const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const usersCotroller = require("../controllers/users.cotroller");
const router = new express.Router();


router.get("/self", authenticationMiddleware(), usersCotroller.getSelfDetails);

module.exports = router;
