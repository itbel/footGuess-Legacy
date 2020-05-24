const express = require("express");
const server = express.Router();

let matchModel = require("../models/match.model");

server.route("/addmatch").post((req, res, next) => {
  console.log(`========== ADDING NEW MATCH ==========`);
  matchModel.create(
    {
      tournamentid: req.body.tournamentid,
      teamAName: req.body.teamA,
      teamBName: req.body.teamB,
    },
    (err, doc) => {
      if (err) next(err);
      else res.json(doc);
    }
  );
  console.log(`========== FINISHED ADDING MATCH OPERATION ==========`);
});

server.route("/allmatches").get((req, res, next) => {
  console.log(`========== FETCHING ALL MATCHES IN TOURNAMENT ==========`);
  matchModel.find({ tournamentid: req.body.tournamentid }, (err, doc) => {
    if (err) console.log(err);
    else res.json(doc);
  });
  console.log(`========== FINISHED FETCHING ALL MATCHES OPERATION ==========`);
});

module.exports = server;