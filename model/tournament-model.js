const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tournament = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: { type: String, required: true },
    team: {
      teamName: { type: String, required: true },
      teamPoints: { type: Number, default: 0 },
      teamWins: { type: Number, default: 0 },
      teamLosses: { type: Number, default: 0 },
      teamTies: { type: Number, default: 0 },
    },
    player: {
      playerName: { type: String, required: true },
      playerPoints: { type: Number, default: 0 },
    },
    match: {
      teamAName: { type: String, required: true },
      teamAResult: { type: Number },
      teamBName: { type: String, required: true },
      teamBResult: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tournament", Tournament);
