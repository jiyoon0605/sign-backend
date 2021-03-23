const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const uploadSchema = new mongoose.Schema({
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
  craeteAt: {
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
  curNum: {
    type: Number,
    default: 0,
  },
  list: {
    type: Array,
  },
});

module.exports = mongoose.model("Post", postSchema);
