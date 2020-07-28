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
  password: { type: String, required: true, trim: true, minlength: 4 },
  name: { type: String, required: true },
  email: { type: String },
  tournaments: [{ type: Schema.Types.ObjectId, ref: "tournament" }],
});

module.exports = mongoose.model("user", User);
