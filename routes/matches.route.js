const express = require("express");
const server = express.Router();

let matchModel = require("../models/match.model");

server.route("/addmatch").post((req, res, next) => {
  console.log(`========== ADDING NEW MATCH ==========`);
  matchModel.create(
    {
      tournamentid: req.body.tournamentid,
      round: req.body.round,
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

server.route("/addresult").post((req, res, next) => {
  console.log(`========== REMOVING MATCH ==========`);
  matchModel.findByIdAndUpdate(
    { _id: req.body.matchid },
    { teamAResult: req.body.teamAResult, teamBResult: req.body.teamBResult },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});

server.route("/getround").post((req, res, next) => {
  console.log(`========== FETCHING ROUND ==========`);
  matchModel.find(
    { tournamentid: req.body.tournamentid, round: req.body.round },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});

server.route("/removematch").post((req, res, next) => {
  console.log(`========== REMOVING MATCH ==========`);
  matchModel.findByIdAndDelete({ _id: req.body.matchid }, (err, doc) => {
    if (err) res.json(err);
    else res.json(doc);
  });
});

server.route("/allmatches").post((req, res, next) => {
  console.log(`========== FETCHING ALL MATCHES IN TOURNAMENT ==========`);
  matchModel.find({ tournamentid: req.body.tournamentid }, (err, doc) => {
    if (err) console.log(err);
    else res.json(doc);
  });
  console.log(`========== FINISHED FETCHING ALL MATCHES OPERATION ==========`);
});

module.exports = server;
