const router = require("express").Router();
const verify = require("./verifyToken");

let teamModel = require("../models/team.model");
let matchModel = require("../models/match.model");

router.post("/manage", verify, (req, res, next) => {
  console.log(`========== ADDING NEW TEAM ==========`);
  teamModel.create(
    {
      tournamentid: req.body.tournamentid,
      teamName: req.body.teamName,
      teamPoints: 0,
      teamWins: 0,
      teamLosses: 0,
      teamTies: 0,
    },
    (err, doc) => {
      if (err) next(err);
      else res.status(201).json({ msg: "Team Created" });
    }
  );
});

router.delete("/manage/:id", verify, (req, res, next) => {
  console.log(`========== REMOVING TEAM ==========`);
  teamModel.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) next(err);
    else {
      matchModel.deleteMany(
        { tournamentid: doc.tournamentid },
        { $or: [{ teamAName: doc.teamName }, { teamBName: doc.teamName }] },
        (err2, doc2) => {
          if (err2) next(err2);
          else {
            res.status(200).json({ msg: "Team Deleted" });
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
