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

// deep population
router.get("/points", verify, (req, res, next) => {
  console.log("========== FETCHING ROUND POINTS ==========");
  matchModel
    .find({ tournamentid: "5ed2e648d4addd26a839833d", round: 1 })
    .populate("guesses.guessid")
    .exec((err, doc) => {
      if (err) next(err);
      else {
        console.log(doc);
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

module.exports = router;
