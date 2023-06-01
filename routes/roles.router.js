const express = require("express");
const rolesController = require("../controllers/roles.controller");
const router = new express.Router();


router.post("/", rolesController.add);
router.get("/", rolesController.get);

module.exports = router
