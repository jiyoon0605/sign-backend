require("dotenv").config({ path: "../../.env" });
const multer = require("multer");
const express = require("express");
const router = express.Router();
const controller = require("../controller/post.controller");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.substr(file.originalname.lastIndexOf("."));
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
    limits: {
      fileSize: 1024 * 1000 * 16,
    },
  }),
});

router.post("/upload", upload.single("img"), controller.upload);

router.get("/", controller.getList);

router.post("/img", controller.getImg);

router.get("/:id", controller.getDetail);

router.get("/category/:category", controller.getCategory);

router.get("/sign/:id", controller.signOn);

router.delete("/:id", controller.remove);

router.get("/mypage/post", controller.getMyPost);
router.get("/mypage/agree", controller.getAgreePost);

module.exports = router;
