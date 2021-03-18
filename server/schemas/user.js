const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: { type: String, require: true, trim: true },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userSchema", userSchema);
