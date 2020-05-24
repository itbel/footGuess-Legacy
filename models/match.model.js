const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Match = new Schema({
  tournamentid: {
    type: Schema.Types.ObjectId,
    ref: "tournament",
    required: true,
  },
  teamAName: { type: String, required: true },
  teamAResult: { type: Number },
  teamBName: { type: String, required: true },
  teamBResult: { type: Number },
});

module.exports = mongoose.model("match", Match);