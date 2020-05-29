const express = require("express");
const server = express.Router();

let tournamentModel = require("../models/tournament.model");

server.route("/createtournament").post((req, res, next) => {
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
  console.log(`========== CREATED A TOURNAMENT ==========`);
});

server.route("/join").post((req, res, next) => {
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
  console.log(`========== USER JOINED TOURNAMENT ==========`);
});

server.route("/getjoinedtournaments").post((req, res, next) => {
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
  console.log(`========== FETCHED JOINED TOURNAMENTS ==========`);
});

server.route("/getownedtournaments").post((req, res, next) => {
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
  console.log(`========== FETCHED JOINED TOURNAMENTS ==========`);
});

server.route("/getalltournaments").get((req, res, next) => {
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
  console.log(`========== FETCHED ALL TOURNAMENTS ==========`);
});

module.exports = server;

/*

server.route("/gettournament").get((req, res, next) => {
  console.log(`========== FETCHING USERS TOURNAMENTS ==========`);
  let tournament;
  tournamentModel.find({ "users.userid": req.body.userid }, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      if (doc.length > 0) {
        matchModel.find({ tournamentid: doc[0]._id }, (err1, doc1) => {
          if (err1) res.json(err1);
          res.json(doc1);
        });
      } else {
        res.json(doc);
      }
    }
  });
  console.log(`========== FINISHED FETCHING TOURNAMENTS OPERATION ==========`);
});*/
