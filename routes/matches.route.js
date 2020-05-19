const express = require("express");
const server = express.Router();

let matchModel = require("../models/match.model");
let tournamentModel = require("../models/tournament.model");

server.route("/addmatch").post((req, res, next) => {
  matchModel.create(
    {
      tournamentid: req.body.tournamentid,
      teamAName: req.body.teamA,
      teamBName: req.body.teamB,
    },
    (err, doc) => {
      if (err) next(err);
      else {
        tournamentModel.updateOne(
          { _id: req.body.tournamentid },
          {
            $push: {
              matches: {
                tournamentid: doc.tournamentid,
                matchid: doc._id,
              },
            },
          },
          (err, doc) => {
            if (err) console.log(err);
            else console.log("Successfully edited.");
          }
        );
        res.json(doc);
      }
    }
  );
});

module.exports = server;
