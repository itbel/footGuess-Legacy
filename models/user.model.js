const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
  },
  password: { type: String, required: true },
  tournaments: { type: Schema.Types.ObjectId, ref: "tournament" },
  name: { type: String },
  email: { type: String },
});

module.exports = mongoose.model("user", User);
