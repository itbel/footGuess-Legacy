const express = require("express");
const server = express.Router();

let tournamentModel = require("../models/tournament.model");
let teamModel = require("../models/team.model");

server.route("/createtournament").post((req, res, next) => {
  console.log(
    `Creating tournament with name:${req.body.name} by userid:${req.body.owner}`
  );
  tournamentModel.create(
    {
      name: req.body.name,
      owner: req.body.owner,
    },
    (err, doc) => {
      if (err) next(err);
      else res.json(doc);
    }
  );
});

server.route("/addteam").post((req, res, next) => {
  teamModel.create(
    {
      tournamentid: "5ec0459ab812523b008bcf19",
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

module.exports = server;
