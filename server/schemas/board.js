const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Type: { ObjectId },
} = Schema;

const boardSchema = new Schema({
  writer: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
  },
  craeteAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Board", boardSchema);
