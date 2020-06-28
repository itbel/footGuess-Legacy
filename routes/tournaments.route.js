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
  tournamentModel.findByIdAndUpdate(
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
        res.json(doc);
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
      if (err) next(err);
      else res.json(doc);
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

// ???????? expensive query, requires more work
router.get("/players/:id", verify, (req, res, next) => {
  console.log(`========== FETCHING TOURNAMENT PLAYERS ==========`);
  tournamentModel.find(
    { _id: req.params.id },
    { "users.userid": "", "users.points": "" },
    (err, doc) => {
      if (err) next(err);
      else {
        userModel.find(
          { _id: doc[0].users.userid },
          { name: "" },
          (err1, userdoc) => {
            if (err) res.json(err1);
            else {
              let response = [];
              userdoc.map((touruserentry, key) => {
                doc[0].users.userid.map((docentry, key2) => {
                  if (
                    JSON.stringify(touruserentry._id) ===
                    JSON.stringify(docentry)
                  ) {
                    response.push({
                      name: touruserentry.name,
                      points: doc[0].users.points[key2],
                    });
                  }
                });
              });
              res.status(200).json(response);
            }
          }
        );
      }
    }
  );
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
  tournamentModel.find({}, (err, doc) => {
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

module.exports = router;
