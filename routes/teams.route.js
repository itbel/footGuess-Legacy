const express = require("express");
const server = express.Router();

let teamModel = require("../models/team.model");

server.route("/add").post((req, res, next) => {
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
});

server.route("/remove").delete((req, res, next) => {
  console.log(`========== REMOVING TEAM ==========`);
  teamModel.findByIdAndDelete({ _id: req.body.teamid }, (err, doc) => {
    if (err) res.json(err);
    else res.status(200).json(doc);
  });
});

server.route("/all/:id").get((req, res, next) => {
  console.log(`========== FETCHING TOURNAMENT TEAMS ==========`);
  teamModel.find({ tournamentid: req.params.id }, {}, (err, doc) => {
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
