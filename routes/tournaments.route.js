const express = require("express");
const server = express.Router();

let tournamentModel = require("../models/tournament.model");
let userModel = require("../models/user.model");

server.route("/createtournament").put((req, res, next) => {
  console.log(`========== CREATING A TOURNAMENT ==========`);
  tournamentModel.create(
    {
      name: req.body.name,
      owner: req.body.owner,
    },
    (err, doc) => {
      if (err) next(err);
      else res.json(doc);
    }
  );
});

server.route("/join").patch((req, res, next) => {
  console.log(`========== USER JOINING TOURNAMENT ==========`);
  tournamentModel.findByIdAndUpdate(
    { _id: req.body.tournamentid },
    {
      $addToSet: {
        users: {
          userid: req.body.userid,
          tournamentid: req.body.tournamentid,
          points: 0,
        },
      },
    },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});

server.route("/leave").patch((req, res, next) => {
  console.log(`========== USER LEAVING TOURNAMENT ==========`);
  tournamentModel.updateOne(
    { _id: req.body.tournamentid },
    {
      $pull: {
        users: {
          userid: req.body.userid,
        },
      },
    },
    (err, doc) => {
      if (err) res.json(err);
      else res.json(doc);
    }
  );
});

server.route("/getjoinedtournaments").post((req, res, next) => {
  console.log(`========== FETCHING USER JOINED TOURNAMENTS ==========`);
  tournamentModel.find({ "users.userid": req.body.userid }, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      if (doc.length > 0) {
        let entries = Object.entries(doc);
        let i = 0;
        for (let entry of entries) {
          doc[i] = {
            name: entry[1].name,
            tournamentid: entry[1]._id,
          };
          i++;
        }
        res.json(doc);
      } else {
        res.json(doc);
      }
    }
  });
});

// ???????? expensive query, requires more work
server.route("/players").post((req, res, next) => {
  console.log(`========== FETCHING TOURNAMENT PLAYERS ==========`);
  tournamentModel.find(
    { _id: req.body.tournamentid },
    { "users.userid": "", "users.points": "" },
    (err, doc) => {
      if (err) {
        res.json(err);
      } else {
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
              res.json(response);
            }
          }
        );
      }
    }
  );
});

server.route("/getownedtournaments").post((req, res, next) => {
  console.log(`========== FETCHING USER OWNED TOURNAMENTS ==========`);
  tournamentModel.find({ owner: req.body.userid }, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      if (doc.length > 0) {
        let entries = Object.entries(doc);
        let i = 0;
        for (let entry of entries) {
          doc[i] = {
            name: entry[1].name,
            tournamentid: entry[1]._id,
          };
          i++;
        }
        res.json(doc);
      } else {
        res.json(doc);
      }
    }
  });
});

server.route("/getalltournaments").get((req, res, next) => {
  console.log(`========== FETCHING ALL TOURNAMENTS ==========`);
  tournamentModel.find({}, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      if (doc.length > 0) {
        let entries = Object.entries(doc);
        let i = 0;
        for (let entry of entries) {
          doc[i] = {
            name: entry[1].name,
            tournamentid: entry[1]._id,
          };
          i++;
        }
        res.json(doc);
      } else {
        res.json(doc);
      }
    }
  });
});

module.exports = server;
