const path = require("path");

const express = require("express");

const authController = require("../controller/auth.controller");

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
