const express = require("express");
const server = express.Router();

let teamModel = require("../models/team.model");

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
  teamModel.findByIdAndDelete({ _id: req.body.teamid }, (err, doc) => {
    if (err) res.json(err);
    else res.json(doc);
  });
});

server.route("/getteams").post((req, res, next) => {
  teamModel.find({ tournamentid: req.body.tourid }, {}, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      if (doc.length > 0) {
        res.json(doc);
      } else {
        res.json({});
      }
    }
  });
});

module.exports = server;
