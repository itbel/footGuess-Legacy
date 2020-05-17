const express = require("express");
const server = express.Router();

let teamModel = require("../models/team.model");
let tournamentModel = require("../models/tournament.model");
server.route("/addteam").post((req, res, next) => {
  // better implementation needed:
  // get entire teams array, look for team name, if not found add, otherwise error
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
      else res.json(doc);
    }
  );
  tournamentModel.findByIdAndUpdate(
    { _id: req.body.id },
    { $push: { teams: req.body.teamName } },
    (err, doc) => {
      if (err) console.log(err.name);
      else console.log("Successfully edited.");
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
    { teamName: req.body.name },
    { tournamentid: req.body.id },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});
server.ro;

server.route("/findteams").get((req, res, next) => {
  tournamentModel.find({ name: req.body.name }, (err, doc) => {
    if (err) next(err);
    res.json(doc);
  });
});

module.exports = server;
