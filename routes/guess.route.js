const express = require("express");
const server = express.Router();

let guessModel = require("../models/guess.model");

server.route("/addguess").post((req, res, next) => {
  console.log(`========== ADDING GUESS ==========`);
  guessModel.create(
    {
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
});
server.route("/guesses").post((req, res, next) => {
  console.log(`========== FETCHING USER GUESSES ==========`);
  guessModel.find({ userid: req.body.userid }, (err, doc) => {
    if (err) next(err);
    else res.json(doc);
  });
});

module.exports = server;
