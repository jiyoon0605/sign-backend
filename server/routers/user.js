const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");

router.post("/register", controller.register);

router.post("/sendEmail", controller.sendEmail);

router.post("/login", controller.login);

router.get("/userData", controller.userData);
module.exports = router;
