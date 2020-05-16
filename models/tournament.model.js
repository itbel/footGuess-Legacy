const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  teams: { type: Schema.Types.ObjectId, ref: "team" },
  users: { type: Schema.Types.ObjectId, ref: "user" },
  matches: { type: Schema.Types.ObjectId, ref: "match" },
});

module.exports = mongoose.model("tournament", Tournament);
