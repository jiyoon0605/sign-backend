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
        user.save().then((result) => {
          console.log(result);
        });
        res.status(201).send({
          success: "계정생성성공",
        });
      }
    })
    .catch(console.log);
  //   const user = new userSchema(req.body);
  //   user.save((err, userInfo) => {
  //     if (err) return res.json({ success: false, err });
  //     return res.status(200).json({
  //       success: true,
  //     });
  //   });
});

module.exports = router;
