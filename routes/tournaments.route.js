const express = require("express");
const server = express.Router();

let tournamentModel = require("../models/tournament.model");

server.route("/createtournament").post((req, res, next) => {
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

module.exports = server;
