const express = require("express");
const server = express.Router();

let matchModel = require("../models/match.model");
let guessModel = require("../models/guess.model");

server.route("/add").post((req, res, next) => {
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
});

server.route("/update").patch((req, res, next) => {
  console.log(`========== UPDATING MATCH RESULT==========`);
  matchModel.findByIdAndUpdate(
    { _id: req.body.matchid },
    { teamAResult: req.body.teamAResult, teamBResult: req.body.teamBResult },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});
// logic can be improved upon
server.route("/unguessed/:id&:user").get((req, res, next) => {
  console.log("========== FETCHING UNGUESSED MATCHES ==========");
  matchModel.find({ tournamentid: req.params.id }, (err, allmatches) => {
    if (err) res.json(err);
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
            res.json(allmatches);
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
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});

server.route("/maxround/:id").get((req, res, next) => {
  matchModel
    .find({ tournamentid: req.params.id })
    .sort({ round: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) res.json(err);
      else {
        doc._id = undefined;
        doc.tournamentid = undefined;
        res.json(doc);
      }
    });
});

server.route("/remove").delete((req, res, next) => {
  console.log(`========== REMOVING MATCH ==========`);
  matchModel.findByIdAndDelete({ _id: req.body.matchid }, (err, doc) => {
    if (err) res.json(err);
    else res.json(doc);
  });
});

server.route("/all/:id").get((req, res, next) => {
  console.log(`========== FETCHING ALL MATCHES IN TOURNAMENT ==========`);
  matchModel.find({ tournamentid: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else res.json(doc);
  });
});

module.exports = server;
