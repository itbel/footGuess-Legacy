const express = require("express");
const bcrypt = require("bcryptjs");
const server = express.Router();

let userModel = require("../model/user.model");

server.route("/login").post((req, res, next) => {
  userModel.findOne({ username: req.body.username }, (err, doc) => {
    if (err) next(err);
    else {
      if (doc !== null)
        bcrypt.compare(req.body.password, doc.password, (err, isRight) => {
          if (isRight) {
            delete doc.hash;
            res.json(doc);
          } else res.json({ msg: "Invalid login" });
        });
    }
  });
});

server.route("/register").post((req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    else
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) next(err);
        else
          userModel.create(
            { username: req.body.username, password: hash },
            (err, doc) => {
              if (err) next(err);
              else res.json(doc);
            }
          );
      });
  });
});
module.exports = server;
