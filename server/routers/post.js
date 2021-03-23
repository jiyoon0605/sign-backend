require("dotenv").config({ path: "../../.env" });
const multer = require("multer");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const postSchema = require("../schemas/post");
let jwt = require("jsonwebtoken");
const fs = require("fs");

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

router.post("/upload", upload.single("img"), (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) res.status(404).send({ message: "올바른 토큰이 아닙니다." });
    else {
      const finalImg = {
        filename: req.file.filename,
        contentType: req.file.mimetype,
      };

      const post = new postSchema({
        id: new mongoose.Types.ObjectId(),
        img: finalImg,
        title: req.body.title,
        content: req.body.content,
        writer: decoded.name,
        writerId: decoded.id,
        endDate: req.body.endDate,
        goalNum: req.body.goalNum,
      });
      post.save((err, data) => {
        if (err) {
          return res.status(404).send({
            fail: err,
          });
        }
        res.status(201).send({
          success: "글이 등록 되었습니다.",
          img: post.img,
        });
      });
    }
  });
});

router.get("/", (req, res) => {
  postSchema.find({}, function (err, posts) {
    if (err) return res.status(500).send("User 전체 조회 실패.");
    res.status(200).send(posts);
  });
});
module.exports = router;

router.post("/img", (req, res) => {
  postSchema.find(
    {
      _id: req.body.id,
    },
    (err, posts) => {
      if (err) return res.status(404).send("이미지 정보 없음");
      fs.readFile(`uploads/${posts[0].img.filename}`, (err, data) => {
        res.status(200).send({
          base64: data.toString("base64"),
          contentType: posts[0].img.contentType,
        });
      });
    }
  );
});
