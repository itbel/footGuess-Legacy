const express = require("express");
const server = express.Router();

let teamModel = require("../models/team.model");
let tournamentModel = require("../models/tournament.model");
server.route("/addteam").post((req, res, next) => {
  console.log(`========== ADDING NEW TEAM ==========`);
  teamModel.create(
    {
      tournamentid: req.body.tournamentid,
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
  console.log(`========== FINISHED ADDING OPERATION ==========\n`);
});

server.route("/deleteteam").post((req, res, next) => {
  console.log(`========== REMOVING TEAM ==========`);
  teamModel.findOneAndDelete(
    { teamName: req.body.teamName },
    { id: req.body.tournamentid },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
  console.log(`========== FINISHED REMOVE OPERATION ==========\n`);
});

server.route("/getteams").post((req, res, next) => {
  teamModel.find({ tournamentid: req.body.tournamentid }, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      if (doc.length > 0) {
        res.json(doc);
      } else {
        doc.msg = "Empty";
        res.json(doc);
      }
    }
  });
});

module.exports = server;
