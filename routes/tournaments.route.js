const router = require("express").Router();
const verify = require("./verifyToken");
const validateTournament = require("./validateTournament");
const Axios = require("axios");
const partidas = require("./partidas");
const tourneios = require("./tourneios");

let tournamentModel = require("../models/tournament.model");
let userModel = require("../models/user.model");
let matchModel = require("../models/match.model");
let guessModel = require("../models/guess.model");
let teamModel = require("../models/team.model");

router.post("/manage", verify, (req, res, next) => {
  console.log(`========== CREATING A TOURNAMENT ==========`);
  let validate = validateTournament(req.body.name);
  if (validate.accepted) {
    tournamentModel.findOne({ name: req.body.name }, (err, doc) => {
      if (err) next(err);
      else {
        if (doc === null) {
          tournamentModel.create(
            {
              name: req.body.name,
              owner: req.user._id,
              status: "ACTIVE",
            },
            (err2, doc2) => {
              if (err2) next(err2);
              else res.status(200).json({ id: doc2._id });
            }
          );
        } else {
          res.status(409).json({ msg: "Tournament already exists" });
        }
      }
    });
  } else {
    res.status(422).json({ msg: validate.msg });
  }
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
      if (err) next(err);
      else {
        res.status(204).send();
      }
    }
  );
});

router.patch("/end", verify, (req, res, next) => {
  console.log(`========== ENDING TOURNAMENT ==========`);
  tournamentModel.findOne({ _id: req.body.id }, (err1, doc1) => {
    if (err1) next(err1);
    else {
      if (req.user._id.toString() === doc1.owner.toString()) {
        tournamentModel.updateOne(
          { _id: req.body.id },
          { status: "ENDED" },
          (err2, doc2) => {
            if (err2) next(err2);
            else {
              tournamentModel.findOne(
                { _id: req.body.id },
                {
                  users: [],
                },
                (err3, doc3) => {
                  if (err3) next(err3);
                  else {
                    if (doc3 !== null) {
                      let highestNum = 0;
                      doc3.users.map((val, key) => {
                        if (val.points > highestNum) highestNum = key;
                      });
                      userModel.findByIdAndUpdate(
                        { _id: doc3.users[highestNum].userid },
                        {
                          $addToSet: {
                            tournaments: doc1._id,
                          },
                        },
                        (err4, doc4) => {
                          if (err4) next(err4);
                          else {
                            doc3.users = undefined;
                            doc3.save();
                            res.status(204).send();
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        );
      } else {
        res.status(403).send();
      }
    }
  });
});
router.get("/select", (req, res, next) => {
  const obj = tourneios;
  let builtTours = [];
  obj.map((value) => {
    let singleTour = {};
    if (
      value.nome === "Campeonato Brasileiro" ||
      value.nome === "Copa do Brasil"
    ) {
      singleTour.id = value.campeonato_id;
      singleTour.name = value.nome;
      singleTour.year = value.edicao_atual.temporada;
      singleTour.status = value.status;
      builtTours.push(singleTour);
    }
  });
  res.json(builtTours);
});

router.post("/addtour", (req, res, next) => {
  let obj = partidas;
  let rodadas = [];
  let matches = [];
  for (const [key, value] of Object.entries(obj.partidas["fase-unica"])) {
    for (const [key2, value2] of Object.entries(value)) {
      matches.push({
        partida_id: value2.partida_id,
        placar: value2.placar,
        time_mandante: value2.time_mandante,
        time_visitante: value2.time_visitante,
        placar_mandante: value2.placar_mandante,
        placar_visitante: value2.placar_visitante,
        data_realizacao_iso: value2.data_realizacao_iso,
        estadio: value2.estadio,
      });
    }
    rodadas.push(matches);
    matches = [];
  }
  res.json(rodadas);
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
      else {
        guessModel.deleteMany({ userid: req.user._id }, (err2, doc2) => {
          if (err2) next(err2);
          else {
            res.status(204).send();
          }
        });
      }
    }
  );
});

router.get("/joined", verify, (req, res, next) => {
  console.log(`========== FETCHING USER JOINED TOURNAMENTS ==========`);
  tournamentModel.find(
    { "users.userid": req.user._id, status: "ACTIVE" },
    (err, doc) => {
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
    }
  );
});

router.get("/players/:id", verify, (req, res, next) => {
  tournamentModel
    .findOne({ _id: req.params.id })
    .populate({ path: "users.userid" })
    .exec((err, doc) => {
      if (err) next(err);
      else {
        if (doc !== null) {
          let users = [];
          doc.users.map((user, key) => {
            users.push({ name: user.userid.name, points: user.points });
          });
          users.sort((a, b) => {
            return b.points - a.points;
          });
          res.json(users);
        } else {
          res.json({ msg: "No users found" });
        }
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
    .find({ status: "ACTIVE" })
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

router.get("/wins", (req, res, next) => {
  console.log("======== GETTING MOST WINS =========");
  userModel.find({}, (err, doc) => {
    if (err) next(err);
    else {
      if (doc !== null) {
        let users = [];
        doc.map((val, key) => {
          users.push({ player: val.name, wins: val.tournaments.length });
        });
        users.sort((a, b) => {
          return b.wins - a.wins;
        });
        res.status(200).send(users.slice(0, 5));
      } else {
        res.status(404).send();
      }
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
            matchModel.deleteMany(
              { tournamentid: req.params.id },
              (err3, doc3) => {
                if (err3) next(err3);
                else {
                  guessModel.deleteMany(
                    { tournamentid: req.params.id },
                    (err4, doc4) => {
                      if (err4) next(err4);
                      else {
                        teamModel.deleteMany(
                          { tournamentid: req.params.id },
                          (err5, doc5) => {
                            if (err5) next(err5);
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
        res.status(403).send();
      }
    }
  });
});

module.exports = router;
