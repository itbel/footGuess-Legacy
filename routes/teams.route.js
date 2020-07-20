const router = require("express").Router();
const verify = require("./verifyToken");
const validateTeam = require("./validateTeam");

let teamModel = require("../models/team.model");
let matchModel = require("../models/match.model");
let guessModel = require("../models/guess.model");
router.post("/manage", verify, (req, res, next) => {
  console.log(`========== ADDING NEW TEAM ==========`);
  let validate = validateTeam(req.body.teamName);
  if (validate.accepted) {
    teamModel.findOne({ teamName: req.body.teamName }, (err, doc) => {
      if (err) next(err);
      else {
        if (doc === null) {
          teamModel.create(
            {
              tournamentid: req.body.tournamentid,
              teamName: req.body.teamName,
              teamPoints: 0,
              teamWins: 0,
              teamLosses: 0,
              teamTies: 0,
            },
            (err2, doc2) => {
              if (err2) next(err2);
              else res.status(201).json({ msg: "Team created." });
            }
          );
        } else {
          res.status(409).json({ msg: "Team already exists" });
        }
      }
    });
  } else {
    res.status(422).json({ msg: validate.msg });
  }
});

router.delete("/manage/:id", verify, (req, res, next) => {
  console.log(`========== REMOVING TEAM ==========`);
  teamModel.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) next(err);
    else {
      matchModel.find(
        { tournamentid: doc.tournamentid },
        { $or: [{ teamAName: doc.teamName }, { teamBName: doc.teamName }] },
        (err2, doc2) => {
          if (err2) next(err2);
          else {
            matchModel.deleteMany(
              {
                tournamentid: doc.tournamentid,
                $or: [{ teamAName: doc.teamName }, { teamBName: doc.teamName }],
              },
              (err3, doc3) => {
                if (err3) next(err3);
                else {
                  guessModel.deleteMany({ matchid: doc2._id }, (err4, doc4) => {
                    if (err4) next(err4);
                    else {
                      res.status(200).send();
                    }
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

router.get("/all/:id", verify, (req, res, next) => {
  console.log("FETCH ALL TEAMS");
  teamModel
    .find({ tournamentid: req.params.id })
    .sort({ teamName: 1 })
    .exec((err, doc) => {
      if (err) next(err);
      else res.status(200).json(doc);
    });
});

module.exports = router;
