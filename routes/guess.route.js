const express = require("express");
const server = express.Router();

let guessModel = require("../models/guess.model");

server.route("/addguess").post((req, res, next) => {
  console.log(`========== ADDING GUESS ==========`);
  guessModel.create(
    {
      tournamentid: req.body.tournamentid,
      matchid: req.body.matchid,
      teamAguess: req.body.teamAguess,
      teamBguess: req.body.teamBguess,
      userid: req.body.userid,
    },
    (err, doc) => {
      if (err) next(err);
      else res.json(doc);
    }
  );
  console.log(`========== FINISHED ADDING GUESS OPERATION ==========`);
});

module.exports = server;
