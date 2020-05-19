const express = require("express");
const server = express.Router();

let matchModel = require("../models/match.model");
let tournamentModel = require("../models/tournament.model");

server.route("/addmatch").post((req, res, next) => {
  matchModel.create(
    {
      tournamentid: req.body.id,
      teamAName: req.body.teamA,
      teamBName: req.body.teamB,
    },
    (err, doc) => {
      if (err) next(err);
      else {
        tournamentModel.findByIdAndUpdate(
          { _id: req.body.id },
          { $addToSet: { match: doc._id } },
          (err, doc) => {
            if (err) console.log(err.name);
            else console.log("Successfully edited.");
          }
        );
        res.json(doc);
      }
    }
  );
});

module.exports = server;
