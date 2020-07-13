const router = require("express").Router();
const verify = require("./verifyToken");

let teamModel = require("../models/team.model");

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
    else res.status(200).json({ msg: "Team Deleted" });
  });
});

/*router.get("/all/:id", verify, (req, res, next) => {
  console.log(`========== FETCHING TOURNAMENT TEAMS ==========`);
  teamModel.find({ tournamentid: req.params.id }, (err, doc) => {
    if (err) next(err);
    else {
      console.log(doc);
      res.status(200).json(doc);
    }
  });
});*/

router.get("/all/:id", verify, (req, res, next) => {
  teamModel
    .find({ tournamentid: req.params.id })
    .sort({ teamName: 1 })
    .exec((err, doc) => {
      if (err) next(err);
      else res.status(200).json(doc);
    });
});

module.exports = router;
