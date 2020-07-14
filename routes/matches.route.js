const router = require("express").Router();
const verify = require("./verifyToken");
const verifyMatch = require("./verifyMatch");

let matchModel = require("../models/match.model");
let guessModel = require("../models/guess.model");
let userModel = require("../models/user.model");
let tournamentModel = require("../models/tournament.model");

router.post("/manage", verify, (req, res, next) => {
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

router.patch("/manage", verify, (req, res, next) => {
  console.log(`========== UPDATING MATCH RESULT==========`);
  matchModel
    .findByIdAndUpdate(
      { _id: req.body.matchid },
      { teamAResult: req.body.teamAResult, teamBResult: req.body.teamBResult }
    )
    .exec((err, updatedMatch) => {
      if (err) next(err);
      else {
        matchModel
          .find({ tournamentid: req.body.tourid })
          .populate({
            path: "guesses.guessid",
            populate: {
              path: "userid",
              select: "_id name",
            },
          })
          .exec((err, matches) => {
            if (err) next(err);
            else {
              let players = [];
              matches.map((match, index) => {
                if (
                  match.teamAResult !== undefined ||
                  match.teamBResult !== undefined
                ) {
                  if (match.guesses.guessid !== undefined)
                    for (let i = 0; i < match.guesses.guessid.length; i++) {
                      if (match.guesses.guessid[i] !== undefined) {
                        let currentPlayer =
                          match.guesses.guessid[i].userid.name;
                        let points = verifyMatch(
                          match.guesses.guessid[i].teamAguess,
                          match.guesses.guessid[i].teamBguess,
                          match.teamAResult,
                          match.teamBResult
                        );
                        if (
                          match.guesses.guessid[i].teamAguess !== undefined &&
                          match.guesses.guessid[i].teamBguess !== undefined
                        ) {
                          let found = players.find(
                            (el) => el.name === currentPlayer
                          );
                          if (!found) {
                            players.push({
                              id: match.guesses.guessid[i].userid._id,
                              name: currentPlayer,
                              points: points,
                            });
                          } else {
                            players.map((val, key) => {
                              if (val.name === currentPlayer) {
                                players[key].points += points;
                              }
                            });
                          }
                        }
                      }
                    }
                }
              });
              players.map((player, key) => {
                tournamentModel.findOneAndUpdate(
                  {
                    _id: req.body.tourid,
                    "users.userid": player.id,
                  },
                  {
                    $set: { "users.$.points": player.points },
                  },
                  (err, doc) => {
                    if (err) next(err);
                    else {
                      //verify
                    }
                  }
                );
              });
            }
          });
      }
    });
});

// deep population
router.get("/points/:round&:tourid", verify, (req, res, next) => {
  console.log("========== FETCHING ROUND POINTS ==========");
  matchModel
    .find({ tournamentid: req.params.tourid, round: req.params.round })
    .populate({
      path: "guesses.guessid",
      populate: {
        path: "userid",
        select: "_id name",
      },
    })
    .exec((err, doc) => {
      if (err) next(err);
      else {
        let matches = [];
        let match = {};
        for (let i = 0; i < doc.length; i++) {
          if (
            doc[i].teamAResult === undefined ||
            doc[i].teamBResult === undefined
          )
            match = {
              matchid: doc[i]._id,
              teamAName: doc[i].teamAName,
              teamBName: doc[i].teamBName,
              guesses: [],
            };
          else {
            match = {
              matchid: doc[i]._id,
              teamAName: doc[i].teamAName,
              teamBName: doc[i].teamBName,
              guesses: [],
              teamAResult: doc[i].teamAResult,
              teamBResult: doc[i].teamBResult,
            };
          }
          matches.push(match);
        }
        let guess = {};
        for (let t = 0; t < doc.length; t++) {
          if (doc[t].guesses.guessid !== undefined)
            for (let a = 0; a < doc[t].guesses.guessid.length; a++) {
              if (doc[t].guesses.guessid[a] !== null) {
                guess = {
                  player: doc[t].guesses.guessid[a].userid,
                  matchid: doc[t].guesses.guessid[a].matchid,
                  teamAguess: doc[t].guesses.guessid[a].teamAguess,
                  teamBguess: doc[t].guesses.guessid[a].teamBguess,
                  points: 0,
                };
                matches[t].guesses.push(guess);
              }
            }
        }
        matches.map((match, key) => {
          if (
            match.teamAResult !== undefined &&
            match.teamBResult !== undefined
          ) {
            match.guesses.map((guess, key2) => {
              matches[key].guesses[key2].points = verifyMatch(
                guess.teamAguess,
                guess.teamBguess,
                match.teamAResult,
                match.teamBResult
              );
            });
          }
        });

        res.json(matches);
      }
    });
});

// logic can be improved upon
router.get("/unguessed/:id&:round", verify, (req, res, next) => {
  console.log("========== FETCHING UNGUESSED MATCHES ==========");
  matchModel.find(
    { tournamentid: req.params.id, round: req.params.round },
    (err, allmatches) => {
      if (err) next(err);
      else {
        guessModel.find(
          { matchid: { $in: allmatches }, userid: req.user._id },
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
    }
  );
});

router.get("/round/:id&:round", verify, (req, res, next) => {
  console.log(`========== FETCHING ROUND ==========`);
  matchModel.find(
    { tournamentid: req.params.id, round: req.params.round },
    (err, doc) => {
      if (err) next(err);
      else res.status(200).json(doc);
    }
  );
});

router.get("/maxround/:id", verify, (req, res, next) => {
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

router.delete("/manage/:id", verify, (req, res, next) => {
  console.log(`========== REMOVING MATCH ==========`);
  matchModel.findByIdAndDelete({ _id: req.params.id }, (err, matchdoc) => {
    if (err) next(err);
    else {
      guessModel.deleteMany({ matchid: req.params.id }, (err, guessdoc) => {
        if (err) next(err);
        else {
          res.status(200).json({ msg: "Match Deleted" });
        }
      });
    }
  });
});

router.get("/all/:id&:round", verify, (req, res, next) => {
  console.log(`========== FETCHING MATCHES IN SELECTED ROUND ==========`);
  matchModel.find(
    { tournamentid: req.params.id, round: req.params.round },
    (err, doc) => {
      if (err) next(err);
      else res.status(200).json(doc);
    }
  );
});

module.exports = router;
