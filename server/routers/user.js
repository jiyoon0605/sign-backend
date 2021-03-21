require("dotenv").config({ path: "../../.env" });
const nodemailer = require("nodemailer");
const userSchema = require("../schemas/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");

router.post("/register", (req, res) => {
  const inputPassword = req.body.password;
  const salt = Math.round(new Date().valueOf * Math.random()) + "";
  const hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  userSchema
    .find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(400).send({
          fail: "이미 존재하는 이메일 입니다.",
        });
      } else {
        const user = new userSchema({
          id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
        });
        user.save((err, userInfo) => {
          if (err) {
            return res.status(404).send({
              fail: err,
            });
          }
        });
        res.status(201).send({
          success: "계정생성성공",
        });
      }
    })
    .catch(console.log);
  const user = new userSchema(req.body);
});

router.post("/sendEmail", async (req, res) => {
  let userEmail = req.body.email;
  console.log(userEmail);

  let number = Math.floor(Math.random() * 1000000) + 1;
  if (number > 1000000) {
    number -= 1000000;
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    secure: true,
    auth: {
      user: process.env.AUTHUSER,
      pass: process.env.AUTHPASS,
    },
  });

  let mailOptions = {
    from: process.env.AUTHUSER,
    to: userEmail,
    subject: "Sign!의 인증번호 입니다.",
    text: String(number),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json({ msg: err });
    } else {
      res.json({ msg: number });
    }

    transporter.close();
  });
});

// router.post("/login", async (req, res) => {
//   let body = req.body;

//   let result = await models.user.findOne({
//     where: {
//       email: body.userEmail,
//     },
//   });
// });
module.exports = router;
