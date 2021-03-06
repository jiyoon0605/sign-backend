require("dotenv").config({ path: "../../.env" });
const nodemailer = require("nodemailer");
const userSchema = require("../schemas/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
let jwt = require("jsonwebtoken");

const register = (req, res) => {
  const inputPassword = req.body.password;
  const salt = String(Math.round(new Date() * Math.random()));
  const hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
  console.log(salt);
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
          salt: salt,
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
};

const sendEmail = async (req, res) => {
  let userEmail = req.body.email;
  console.log(userEmail);

  let number = Math.floor(Math.random() * 1000000) + 1;
  if (number > 1000000) {
    number -= 1000000;
  }

  try {
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
        res.status(404).send({ error: err });
      } else {
        res.status(201).send({ msg: number });
      }

      transporter.close();
    });
  } catch {}
};

const login = async (req, res) => {
  try {
    const user = await userSchema.find({ email: req.body.email });
    if (user) {
      const hashPassword = crypto
        .createHash("sha512")
        .update(req.body.password + user[0].salt)
        .digest("hex");
      if (hashPassword !== user[0].password) {
        return res.status(404).json({ error: "비밀번호가 틀렸습니다." });
      }
      const token = jwt.sign(
        {
          id: user[0]._id,
          email: user[0].userEmail,
          name: user[0].name,
        },
        process.env.SECRETKEY,
        {
          expiresIn: "12h",
        }
      );
      const refreshToken = jwt.sign(
        {
          type: "refresh",
        },
        process.env.SECRETKEY,
        {
          expiresIn: "30d",
        }
      );
      res.cookie("user", token);
      return res.status(201).json({
        result: "ok",
        token,
        refreshToken,
      });
    } else {
      return res.status(404).json({ error: "이메일을 다시 확인해 주세요." });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const userData = (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) res.status(404).send({ message: "올바른 토큰이 아닙니다." });
    userSchema.findOne({ _id: decoded.id }).then((data) => {
      res.status(201).send({ data });
    });
  });
};
module.exports = {
  register,
  sendEmail,
  login,
  userData,
};
