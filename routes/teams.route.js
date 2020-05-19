const express = require("express");
const server = express.Router();

let teamModel = require("../models/team.model");
let tournamentModel = require("../models/tournament.model");
server.route("/addteam").post((req, res, next) => {
  // better implementation needed:
  // create adds documents even if they already exist with same tournament id

  tournamentModel.find(
    { teams: { $elemMatch: { teamName: req.body.teamName } } },
    (err, doc) => {
      if (err) console.log(err);
      else {
        if (doc.length === 0) {
          teamModel.create(
            {
              tournamentid: req.body.id,
              teamName: req.body.teamName,
              teamPoints: 0,
              teamWins: 0,
              teamLosses: 0,
              teamTies: 0,
            },
            (err, doc) => {
              if (err) next(err);
              else {
                tournamentModel.updateOne(
                  { _id: req.body.id },
                  {
                    $addToSet: {
                      teams: {
                        teamid: doc._id,
                        teamName: doc.teamName,
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
        } else {
          console.log("TEAM ALREADY EXISTS, NOT CREATED");
          res.json(doc);
        }
      }
    }
  );
});

server.route("/deleteteam").post((req, res, next) => {
  //removing from teams array
  tournamentModel.findByIdAndUpdate(
    { _id: req.body.id },
    { $pull: { teams: req.body.teamName } },
    (err, doc) => {
      if (err) console.log(err);
      else console.log(doc);
    }
  );
  //removing from collection
  teamModel.findOneAndDelete(
    { teamName: req.body.teamName },
    { id: req.body.id },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});

module.exports = server;
