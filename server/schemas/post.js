const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

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
  image: {
    type: String,
    required: true,
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
  activation: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
