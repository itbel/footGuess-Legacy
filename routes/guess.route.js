const express = require("express");
const server = express.Router();

let guessModel = require("../models/guess.model");
let matchModel = require("../models/match.model");

server.route("/add").post((req, res, next) => {
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
      else res.status(201).json({ msg: "Guess Created" });
    }
  );
});

server.route("/all/:id&:tourid&:round").get((req, res, next) => {
  console.log(`========== FETCHING USER GUESSES ==========`);
  guessModel.find({ userid: req.params.id }, (err, doc) => {
    if (err) next(err);
    else {
      let arr = [];
      for (let i in doc) {
        arr.push(doc[i].matchid);
      }
      matchModel.find(
        { _id: { $in: arr }, tournamentid: req.params.tourid },
        (err, matches) => {
          if (err) next(err);
          else {
            let responseArr = [];
            matches.map((match, entry) => {
              doc.map((guess, entry) => {
                if (
                  JSON.stringify(match._id) === JSON.stringify(guess.matchid)
                ) {
                  if (parseInt(match.round) === parseInt(req.params.round)) {
                    if (
                      typeof match.teamAResult !== undefined &&
                      typeof match.teamBResult !== undefined
                    ) {
                      responseArr.push({
                        matchid: match._id,
                        teamAName: match.teamAName,
                        teamBName: match.teamBName,
                        teamAguess: guess.teamAguess,
                        teamBguess: guess.teamBguess,
                        teamAResult: match.teamAResult,
                        teamBResult: match.teamBResult,
                      });
                    } else
                      responseArr.push({
                        matchid: match._id,
                        teamAName: match.teamAName,
                        teamBName: match.teamBName,
                        teamAguess: guess.teamAguess,
                        teamBguess: guess.teamBguess,
                      });
                  }
                }
              });
            });
            res.status(200).json(responseArr);
          }
        }
      );
    }
  });
});

module.exports = server;
