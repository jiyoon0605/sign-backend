const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const uploadSchema = new Schema({
  filename: {
    type: String,
    unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

const userData = new Schema({
  writer: {
    type: String,
    require: true,
  },
  writerId: {
    type: ObjectId,
    require: true,
  },
});

const postSchema = new Schema({
  writer: {
    type: String,
    required: true,
    ref: "User",
  },
  writerId: {
    type: ObjectId,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: uploadSchema,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: String,
    require: true,
  },
  goalNum: {
    type: Number,
    require: true,
  },
  list: {
    type: [userData],
  },
  category: {
    type: String,
    default: "other",
  },
});

module.exports = mongoose.model("Post", postSchema);
