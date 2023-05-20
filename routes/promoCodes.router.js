const express = require("express");
const promoCodesController = require("../controllers/promoCodes.controller");
const router = new express.Router();


router.get("/add-fetch/:userId", promoCodesController.addOrFetch);
router.get("/", promoCodesController.get);

module.exports = router
