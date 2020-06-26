const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  users: {
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    points: Number,
  },
});

module.exports = mongoose.model("tournament", Tournament);
