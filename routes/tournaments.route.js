const express = require("express");
const server = express.Router();

let tournamentModel = require("../models/tournament.model");

server.route("/createtournament").post((req, res, next) => {
  console.log(`========== CREATING TOURNAMENT ==========`);
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
  console.log(`========== FINISHED CREATING TOURNAMENT OPERATION ==========`);
});

server.route("/join").post((req, res, next) => {
  console.log(`========== ADDING USER TO TOURNAMENT ==========`);
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
  console.log(`========== FINISHED ADDING USER OPERATION ==========`);
});

module.exports = server;
