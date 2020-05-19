const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Guess = new Schema({
  tournamentid: {
    type: Schema.Types.ObjectId,
    ref: "tournament",
    required: true,
  },
  teamAguess: { type: Number },
  teamBguess: { type: Number },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("guess", Guess);
