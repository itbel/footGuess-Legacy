const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  teams: {
    teamid: { type: Schema.Types.ObjectId, ref: "team", unique: true },
    tournamentid: { type: Schema.Types.ObjectId, ref: "tournament" },
    teamName: { type: String },
  },
  users: {
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    tournamentid: { type: Schema.Types.ObjectId, ref: "tournament" },
    points: Number,
  },
  matches: {
    tournamentid: { type: Schema.Types.ObjectId, ref: "tournament" },
    matchid: { type: Schema.Types.ObjectId, ref: "match" },
  },
});

module.exports = mongoose.model("tournament", Tournament);
