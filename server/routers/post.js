require("dotenv").config({ path: "../../.env" });
const multer = require("multer");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const postSchema = require("../schemas/post");
const userSchema = require("../schemas/user");
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
    if (err) res.status(404).send({ error: "올바른 토큰이 아닙니다." });
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
        category: req.body.category,
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
    if (err) return res.status(500).send("게시물 전체 조회 실패.");
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

router.get("/:id", (req, res) => {
  postSchema.findOne({ _id: req.params.id }, (err, post) => {
    if (err || post === null) return res.status(404).send(err);
    res.status(201).send({
      post,
    });
  });
});

router.get("/category/:category", (req, res) => {
  postSchema.find({ category: req.params.category }, (err, post) => {
    if (err || post === null) return res.status(404).send(err);
    res.status(201).send(post);
  });
});

router.get("/sign/:id", (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) res.status(404).send({ error: "올바른 토큰이 아닙니다." });
    else {
      postSchema
        .findOne({ _id: req.params.id })
        .then((post) => {
          let result = true;
          for (let l of post.list) {
            if (l.writerId == decoded.id) {
              result = false;
              break;
            }
          }
          if (post.writerId == decoded.id) {
            res
              .status(404)
              .send({ error: "자신의 글에는 동의할 수 없습니다." });
            return;
          }
          if (result) {
            postSchema.findByIdAndUpdate(
              req.params.id,
              {
                $push: {
                  list: { writer: decoded.name, writerId: decoded.id },
                },
              },
              (err) => {
                if (err) res.status(404).send({ error: "댓글 추가 실패" });
                else {
                  res.status(200).send({ message: "댓글 추가 성공" });
                }
              }
            );
          } else {
            return res.status(404).send({ error: "이미 참여한 글입니다." });
          }
        })
        .catch(() =>
          res.status(404).send({ error: "존재하지 않는 글입니다." })
        );
    }
  });
});

router.delete("/:id", (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) res.status(404).send({ error: "올바른 토큰이 아닙니다." });
    else {
      const result = await postSchema.remove({ id: req.body.id }, (err) => {
        if (err) return res.status(500).json({ message: "Delete Fail!" });
        else return res.status(200).json({ message: "success!" });
      });
    }
  });
});
