const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  teams: {
    teamid: { type: Schema.Types.ObjectId, ref: "team", unique: true },
    teamName: { type: String },
  },
  users: {
    userid: { type: Schema.Types.ObjectId, ref: "user", unique: true },
    points: Number,
  },
  matches: {
    matchid: { type: Schema.Types.ObjectId, ref: "match" },
  },
});

module.exports = mongoose.model("tournament", Tournament);
