const router = require("express").Router();
const verify = require("./verifyToken");

let tournamentModel = require("../models/tournament.model");
let userModel = require("../models/user.model");

router.post("/manage", verify, (req, res, next) => {
  console.log(`========== CREATING A TOURNAMENT ==========`);
  tournamentModel.create(
    {
      name: req.body.name,
      owner: req.user._id,
    },
    (err, doc) => {
      if (err) next(err);
      else res.json(doc);
    }
  );
});

router.patch("/join", verify, (req, res, next) => {
  console.log(`========== USER JOINING TOURNAMENT ==========`);
  tournamentModel.updateOne(
    { _id: req.body.tournamentid },
    {
      $addToSet: {
        users: {
          userid: req.user._id,
          tournamentid: req.body.tournamentid,
          points: 0,
        },
      },
    },
    (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.status(204).send();
      }
    }
  );
});

router.patch("/leave", verify, (req, res, next) => {
  console.log(`========== USER LEAVING TOURNAMENT ==========`);
  tournamentModel.updateOne(
    { _id: req.body.tournamentid },
    {
      $pull: {
        users: {
          userid: req.user._id,
        },
      },
    },
    (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.status(204).send();
      }
    }
  );
});

router.get("/joined", verify, (req, res, next) => {
  console.log(`========== FETCHING USER JOINED TOURNAMENTS ==========`);
  tournamentModel.find({ "users.userid": req.user._id }, (err, doc) => {
    if (err) next(err);
    else {
      let entries = Object.entries(doc);
      let i = 0;
      for (let entry of entries) {
        doc[i] = {
          name: entry[1].name,
          tournamentid: entry[1]._id,
        };
        i++;
      }
      res.status(200).json(doc);
    }
  });
});

router.get("/players/:id", verify, (req, res, next) => {
  tournamentModel
    .findOne({ _id: req.params.id })
    .populate({ path: "users.userid" })
    .exec((err, doc) => {
      if (err) next(err);
      else {
        let users = [];
        doc.users.map((user, key) => {
          users.push({ name: user.userid.name, points: user.points });
        });
        users.sort((a, b) => {
          return b.points - a.points;
        });
        res.json(users);
      }
    });
});

router.get("/owned", verify, (req, res, next) => {
  console.log(`========== FETCHING USER OWNED TOURNAMENTS ==========`);
  tournamentModel.find({ owner: req.user._id }, (err, doc) => {
    if (err) next(err);
    else {
      let entries = Object.entries(doc);
      let i = 0;
      for (let entry of entries) {
        doc[i] = {
          name: entry[1].name,
          tournamentid: entry[1]._id,
        };
        i++;
      }
      res.status(200).json(doc);
    }
  });
});

router.get("/all", (req, res, next) => {
  console.log(`========== FETCHING ALL TOURNAMENTS ==========`);
  tournamentModel
    .find({})
    .populate({ path: "owner" })
    .exec((err, doc) => {
      if (err) next(err);
      else {
        let entries = Object.entries(doc);
        let i = 0;
        for (let entry of entries) {
          doc[i] = {
            name: entry[1].name,
            tournamentid: entry[1]._id,
            owner: entry[1].owner.name,
          };
          i++;
        }
        res.status(200).json(doc);
      }
    });
});

router.delete("/manage/:id", verify, (req, res, next) => {
  console.log(`========== REMOVING TOURNAMENT ==========`);
  tournamentModel.findOne({ _id: req.params.id }, (err1, doc1) => {
    if (err1) next(err1);
    else {
      if (req.user._id.toString() === doc1.owner.toString()) {
        tournamentModel.deleteOne({ _id: req.params.id }, (err2, doc2) => {
          if (err2) next(err2);
          else {
            res.status(200).send();
          }
        });
      }
    }
  });
});

module.exports = router;
