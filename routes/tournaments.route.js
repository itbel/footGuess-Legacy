const express = require("express");
const server = express.Router();

let tournamentModel = require("../models/tournament.model");
let matchModel = require("../models/match.model");

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

server.route("/join").post((req, res, next) => {
  tournamentModel.findByIdAndUpdate(
    { _id: req.body.tournamentid },
    {
      $addToSet: {
        users: {
          userid: req.body.userid,
          points: 0,
        },
      },
    },
    (err, doc) => {
      if (err) console.log("shittt ", err.name);
      else res.json(doc);
    }
  );
});

server.route("/getteams").get((req, res, next) => {
  tournamentModel.find({ name: req.body.name }, (err, doc) => {
    if (err) next(err);
    res.json(doc[0].teams);
  });
});

server.route("/gettournament").get((req, res, next) => {
  tournamentModel.find({ name: req.body.name }, (err, doc) => {
    if (err) next(err);
    res.json(doc);
  });
});

module.exports = server;
