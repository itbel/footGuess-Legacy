const express = require("express");
const server = express.Router();

let matchModel = require("../models/match.model");
let guessModel = require("../models/guess.model");

server.route("/manage").post((req, res, next) => {
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
      else res.status(201).json({ msg: "Match Created" });
    }
  );
});

server.route("/manage").patch((req, res, next) => {
  console.log(`========== UPDATING MATCH RESULT==========`);
  matchModel.findByIdAndUpdate(
    { _id: req.body.matchid },
    { teamAResult: req.body.teamAResult, teamBResult: req.body.teamBResult },
    (err, doc) => {
      if (err) next(err);
      else res.status(204).send();
    }
  );
});
// logic can be improved upon
server.route("/unguessed/:id&:user").get((req, res, next) => {
  console.log("========== FETCHING UNGUESSED MATCHES ==========");
  matchModel.find({ tournamentid: req.params.id }, (err, allmatches) => {
    if (err) next(err);
    else {
      guessModel.find(
        { matchid: { $in: allmatches }, userid: req.params.user },
        (err, guessedmatches) => {
          if (err) next(err);
          else {
            for (let x = 0; x < guessedmatches.length; x++) {
              for (let i = 0; i < allmatches.length; i++) {
                if (
                  guessedmatches[x].matchid.toString() ===
                  allmatches[i]._id.toString()
                ) {
                  allmatches.splice(i, 1);
                }
              }
            }
            res.status(200).json(allmatches);
          }
        }
      );
    }
  });
});

server.route("/round/:id&:round").get((req, res, next) => {
  console.log(`========== FETCHING ROUND ==========`);
  matchModel.find(
    { tournamentid: req.params.id, round: req.params.round },
    (err, doc) => {
      if (err) next(err);
      else res.status(200).json(doc);
    }
  );
});

server.route("/maxround/:id").get((req, res, next) => {
  matchModel
    .find({ tournamentid: req.params.id })
    .sort({ round: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) next(err);
      else {
        doc._id = undefined;
        doc.tournamentid = undefined;
        res.status(200).json(doc);
      }
    });
});

server.route("/manage").delete((req, res, next) => {
  console.log(`========== REMOVING MATCH ==========`);
  matchModel.findByIdAndDelete({ _id: req.body.matchid }, (err, doc) => {
    if (err) next(err);
    else res.status(200).json({ msg: "Match Deleted" });
  });
});

server.route("/all/:id").get((req, res, next) => {
  console.log(`========== FETCHING ALL MATCHES IN TOURNAMENT ==========`);
  matchModel.find({ tournamentid: req.params.id }, (err, doc) => {
    if (err) next(err);
    else res.status(200).json(doc);
  });
});

/* WIP calculating result
server.route("/roundresult/:id&:tourid&:round").get((req, res, next) => {
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
                    }
                  }
                }
              });
            });
            res.json(responseArr);
          }
        }
      );
    }
  });
});*/

module.exports = server;
