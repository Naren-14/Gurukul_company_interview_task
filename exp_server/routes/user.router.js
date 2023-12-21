const path = require("path");

const express = require("express");

const userController = require("../controller/user.controller");

const router = express.Router();

router.get("/get-users", userController.getAllUsers);

router.post("/add-user", userController.addUser);
router.post("/update-user", userController.updateUser);
router.get("/get-user/:userId", userController.getOneUser);
router.delete("/delete-user/:userId", userController.deleteUser);

module.exports = router;
