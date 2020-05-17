const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Team = new Schema({
  tournamentid: { type: Schema.Types.ObjectId, ref: "tournament" },
  teamName: { type: String, required: true },
  teamPoints: { type: Number, default: 0 },
  teamWins: { type: Number, default: 0 },
  teamLosses: { type: Number, default: 0 },
  teamTies: { type: Number, default: 0 },
});

module.exports = mongoose.model("team", Team);
