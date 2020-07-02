const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Match = new Schema({
  tournamentid: {
    type: Schema.Types.ObjectId,
    ref: "tournament",
    required: true,
  },
  round: { type: Number, required: true },
  teamAName: { type: String, required: true },
  teamAResult: { type: Number },
  teamBName: { type: String, required: true },
  teamBResult: { type: Number },
  guesses: { guessid: { type: Schema.Types.ObjectId, ref: "guess" } },
});

module.exports = mongoose.model("match", Match);
