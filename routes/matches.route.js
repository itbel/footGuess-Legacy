const router = require("express").Router();
const verify = require("./verifyToken");
const verifyMatch = require("./verifyMatch");

let matchModel = require("../models/match.model");
let guessModel = require("../models/guess.model");
let userModel = require("../models/user.model");

router.post("/manage", verify, (req, res, next) => {
  console.log(`========== ADDING NEW MATCH ==========`);
  // CHECK OWNERSHIP OF TOURNAMENT FIRST
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
  // CHECK OWNERSHIP OF TOURNAMENT FIRST
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

// logic can be improved upon
router.get("/points", verify, (req, res, next) => {
  console.log("========== FETCHING ROUND TABLE ==========");
  req.params.round = 1;
  req.params.id = "5ed2e648d4addd26a839833d";
  let userScore = 0;
  let match = "";
  matchModel.find(
    { tournamentid: req.params.id, round: req.params.round },
    (err, allmatches) => {
      if (err) next(err);
      else {
        guessModel.find(
          { matchid: { $in: allmatches } },
          (err, guessedmatches) => {
            if (err) next(err);
            else {
              for (let x = 0; x < guessedmatches.length; x++) {
                for (let i = 0; i < allmatches.length; i++) {
                  if (
                    guessedmatches[x].matchid.toString() ===
                    allmatches[i]._id.toString()
                  ) {
                    if (
                      allmatches[i].teamAResult !== undefined &&
                      allmatches[i].teamBResult !== undefined
                    ) {
                      let name = "";
                      userModel.find(
                        { _id: guessedmatches[x].userid },
                        (err, user) => {
                          if (err) next(err);
                          else {
                            guess += "Player : " + user.name;

                            match = `MatchID: ${allmatches[i]._id} - ${allmatches[i].teamAName} ${allmatches[i].teamAResult} x ${allmatches[i].teamBResult} ${allmatches[i].teamBName}`;
                            guess = ` ${allmatches[i].teamAName} ${guessedmatches[x].teamAguess} x ${guessedmatches[x].teamBguess} ${allmatches[i].teamBName}`;
                            guess +=
                              " Points: " +
                              verifyMatch(
                                guessedmatches[x].teamAguess,
                                guessedmatches[x].teamBguess,
                                allmatches[i].teamAResult,
                                allmatches[i].teamBResult
                              );
                            console.log(match);
                            console.log(guess);
                            /*
                      userScore += verifyMatch(
                        guessedmatches[x].teamAguess,
                        guessedmatches[x].teamBguess,
                        allmatches[i].teamAResult,
                        allmatches[i].teamBResult
                      );*/
                          }
                        }
                      );
                    }
                  }
                }
              }
              console.log(userScore);
              res.status(200).json(allmatches);
            }
          }
        );
      }
    }
  );
});

router.get("/round/ranking/:tourid&:round", verify, (req, res, next) => {
  console.log(`========== FETCHING ROUND ==========`);
  guessModel
    .find({ tournamentid: req.params.tourid })
    .populate({
      path: "userid",
      select: "name",
    })
    .populate({
      path: "matchid",
    })
    .exec((err, guesses) => {
      if (err) next(err);
      else {
        let matches = [];
        guesses.map((entry, key) => {
          if (
            entry.matchid.teamAResult !== undefined &&
            entry.matchid.teamBResult !== undefined &&
            parseInt(entry.matchid.round, 10) === parseInt(req.params.round, 10)
          ) {
            matches.push({
              teamAName: entry.matchid.teamAName,
              teamBName: entry.matchid.teamBName,
              teamAResult: entry.matchid.teamAResult,
              teamBResult: entry.matchid.teamBResult,
              teamAGuess: entry.teamAguess,
              teamBGuess: entry.teamBguess,
              points: verifyMatch(
                entry.teamAGuess,
                entry.teamBGuess,
                entry.matchid.teamAResult,
                entry.matchid.teamBResult
              ),
              player: entry.userid.name,
            });
          }
        });
        res.status(200).json(matches);
      }
    });
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
  matchModel.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) next(err);
    else res.status(200).json({ msg: "Match Deleted" });
  });
});

router.get("/all/:id", verify, (req, res, next) => {
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

module.exports = router;
