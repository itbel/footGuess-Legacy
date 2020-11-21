const router = require("express").Router();
const verify = require("./verifyToken");
const validateTeam = require("./validateTeam");

let teamModel = require("../models/team.model");
let matchModel = require("../models/match.model");
let guessModel = require("../models/guess.model");
const tournamentModel = require("../models/tournament.model");

router.post("/manage", verify, (req, res, next) => {
  console.log(`========== ADDING NEW TEAM ==========`);
  let validate = validateTeam(req.body.teamName);
  if (validate.accepted) {
    tournamentModel.findOne({ _id: req.body.tournamentid }, (err, doc) => {
      if (err) next(err);
      else {
        if (doc !== null) {
          if (doc.owner.toString() === req.user._id.toString()) {
            teamModel.findOne({ teamName: req.body.teamName, tournamentid: req.body.tournamentid }, (err2, doc2) => {
              if (err2) next(err2);
              else {
                if (doc2 === null) {
                  teamModel.create(
                    {
                      tournamentid: req.body.tournamentid,
                      teamName: req.body.teamName,
                      teamPoints: 0,
                      teamWins: 0,
                      teamLosses: 0,
                      teamTies: 0,
                    },
                    (err3, doc3) => {
                      if (err3) next(err3);
                      else res.status(201).json({ msg: "Team created." });
                    }
                  );
                } else {
                  res.status(409).json({ msg: "Team already exists" });
                }
              }
            });
          } else {
            res.status(403).json({ msg: "Invalid user" });
          }
        } else {
          res.status(404).json({ msg: "Tournament not found" });
        }
      }
    });
  } else {
    res.status(422).json({ msg: validate.msg });
  }
});

router.delete("/manage/:tourid&:id", verify, (req, res, next) => {
  console.log(`========== REMOVING TEAM ==========`);
  tournamentModel.findOne({ _id: req.params.tourid }, (err, tourdoc) => {
    if (err) next(err);
    else {
      if (tourdoc !== null) {
        if (tourdoc.owner.toString() === req.user._id.toString()) {
          teamModel.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
            if (err) next(err);
            else {
              matchModel.find(
                { tournamentid: doc.tournamentid },
                {
                  $or: [
                    { teamAName: doc.teamName },
                    { teamBName: doc.teamName },
                  ],
                },
                (err2, doc2) => {
                  if (err2) next(err2);
                  else {
                    matchModel.deleteMany(
                      {
                        tournamentid: doc.tournamentid,
                        $or: [
                          { teamAName: doc.teamName },
                          { teamBName: doc.teamName },
                        ],
                      },
                      (err3, doc3) => {
                        if (err3) next(err3);
                        else {
                          guessModel.deleteMany(
                            { matchid: doc2._id },
                            (err4, doc4) => {
                              if (err4) next(err4);
                              else {
                                res.status(200).send();
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        } else {
          res.status(403).json({ msg: "Invalid user" });
        }
      } else {
        res.status(404).json({ msg: "Tournament not found" });
      }
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
