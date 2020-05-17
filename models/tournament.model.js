const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  teams: [],
  users: [],
  matches: [],
});

module.exports = mongoose.model("tournament", Tournament);
