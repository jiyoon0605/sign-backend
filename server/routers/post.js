require("dotenv").config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const controller = require("../controller/post.controller");

router.post("/upload", controller.upload);

router.get("/", controller.getList);

router.get("/:id", controller.getDetail);

router.get("/category/:category", controller.getCategory);

router.get("/sign/:id", controller.signOn);

router.delete("/:id", controller.remove);

router.get("/mypage/post", controller.getMyPost);
router.get("/mypage/agree", controller.getAgreePost);

module.exports = router;
