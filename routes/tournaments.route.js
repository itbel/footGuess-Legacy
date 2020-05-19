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

server.route("/join").post((req, res, next) => {
  tournamentModel.findByIdAndUpdate(
    { _id: req.body.tournamentid },
    {
      $addToSet: {
        users: {
          userid: req.body.userid,
          tournamentid: req.body.tournamentid,
          points: 0,
        },
      },
    },
    (err, doc) => {
      if (err) console.log(err);
      else res.json(doc);
    }
  );
});

server.route("/getmatches").get((req, res, next) => {
  tournamentModel.find({}, (err, doc) => {
    if (err) next(err);
    res.json(doc);
  });
});

server.route("/gettournament").get((req, res, next) => {
  tournamentModel.find({ name: req.body.name }, (err, doc) => {
    if (err) next(err);
    res.json(doc);
  });
});

module.exports = server;
