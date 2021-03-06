require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const postSchema = require("../schemas/post");
let jwt = require("jsonwebtoken");

const getDateString = (d) => {
  const date = d;
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};
const dataFilter = async (posts, res) => {
  const date = getDateString(new Date());

  const deleteList = posts
    .filter((e, i) => {
      const tDate = new Date(e.endDate);
      tDate.setDate(tDate.getDate() + 10);
      const endDate = getDateString(tDate);
      if (endDate < date) return e;
    })
    .slice();

  try {
    await deleteList.map(async (e, i) => {
      await postSchema.findOneAndRemove({ _id: e.id }, (err, post) => {
        if (err || post === null)
          return res.status(404).send({ error: "게시물이 존재하지 않습니다." });
      });
    });
    await posts.map(async (e, i) => {
      if (e.endDate < date) {
        await postSchema.updateOne(
          { _id: e.id },
          { activation: false },
          (err, result) => {
            if (err) return res.status(404).send({ error: err });
          }
        );
      }
    });
    await console.log(posts);
    postSchema.find({}, (err, posts) => {
      res.status(200).send(posts);
    });
  } catch (err) {
    res.status(404).send("게시물 전체 조회 실패.");
  }
};

const getList = (req, res) => {
  postSchema.find({}, (err, posts) => {
    if (err) return res.status(500).send("게시물 전체 조회 실패.");
    dataFilter(posts, res);
  });
};

const upload = (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err && !req.body)
      res.status(404).send({ error: "올바른 토큰이 아닙니다." });
    else {
      const post = new postSchema({
        id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        writer: decoded.name,
        writerId: decoded.id,
        endDate: req.body.endDate,
        goalNum: req.body.goalNum,
        category: req.body.category,
        image: req.body.image,
      });
      post.save((err, data) => {
        if (err) {
          return res.status(404).send({
            fail: err,
          });
        }
        res.status(201).send({
          success: "글이 등록 되었습니다.",
        });
      });
    }
  });
};

const getDetail = (req, res) => {
  postSchema.findOne({ _id: req.params.id }, (err, post) => {
    if (err || post === null) return res.status(404).send(err);
    res.status(201).send({
      post,
    });
  });
};
const getCategory = (req, res) => {
  postSchema.find({ category: req.params.category }, (err, post) => {
    if (err || post === null) return res.status(404).send(err);
    res.status(201).send(post);
  });
};
const signOn = (req, res) => {
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
};
const remove = (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
    if (err) res.status(404).send({ error: "올바른 토큰이 아닙니다." });
    else {
      postSchema.findOneAndRemove({ _id: req.params.id }, (err, post) => {
        if (err || post === null)
          return res.status(404).send({ error: "게시물이 존재하지 않습니다." });
      });
    }
  });
};

const getMyPost = (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) res.status(404).send({ error: "올바른 토큰이 아닙니다." });
    else {
      postSchema.find({ writerId: decoded.id }, (err, post) => {
        if (err) return res.status(404).send(err);
        else if (post === null)
          return res.status(201).send({ message: "작성한 포스트가 없습니다." });
        res.status(201).send(post);
      });
    }
  });
};

const getAgreePost = (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) res.status(404).send({ error: "올바른 토큰이 아닙니다." });
    else {
      postSchema
        .find({})
        .then((posts) => {
          let resultPosts = [];
          posts.map((post) => {
            let result = false;
            for (let l of post.list) {
              if (l.writerId == decoded.id) {
                result = true;
                break;
              }
            }
            if (result) resultPosts.push(post);
          });

          return resultPosts;
        })
        .then((posts) => {
          if (posts.length <= 0)
            return res.status(201).send({ message: "동의한 글이 없습니다." });
          else return res.status(201).send(posts);
        });
    }
  });
};

module.exports = {
  upload,
  getList,
  getDetail,
  getCategory,
  signOn,
  remove,
  getMyPost,
  getAgreePost,
};
