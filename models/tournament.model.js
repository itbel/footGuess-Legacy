const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let matchModel = require("../models/match.model");

const Tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  teams: [],
  users: [
    {
      userid: { type: Schema.Types.ObjectId, unique: true },
      points: Number,
    },
  ],
  match: [
    {
      type: Schema.Types.ObjectId,
      ref: "match",
    },
  ],
});

module.exports = mongoose.model("tournament", Tournament);
