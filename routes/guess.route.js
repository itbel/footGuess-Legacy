const express = require("express");
const server = express.Router();

let guessModel = require("../models/guess.model");

server.route("/addguess").post((req, res, next) => {
  guessModel.create(
    {
      tournamentid: req.body.id,
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

module.exports = server;
