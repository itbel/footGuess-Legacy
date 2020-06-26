const express = require("express");
const bcrypt = require("bcryptjs");
const server = express.Router();

let userModel = require("../models/user.model");

server.route("/login").post((req, res, next) => {
  userModel.findOne({ username: req.body.username }, (err, doc) => {
    if (err) next(err);
    else {
      if (doc !== null) {
        bcrypt.compare(req.body.password, doc.password, (err, isRight) => {
          if (isRight) {
            doc.password = undefined;
            doc.email = undefined;
            doc.username = undefined;
            doc.__v = undefined;
            console.log(doc);
            res.status(200).json(doc);
          } else res.status(401).json({ msg: "Invalid Password" });
        });
      } else {
        res.status(401).json({ msg: "User not found" });
      }
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
            {
              username: req.body.username,
              password: hash,
              name: req.body.name,
              email: req.body.email,
            },
            (err, doc) => {
              if (err) next(err);
              else {
                doc.password = undefined;
                doc.email = undefined;
                doc.username = undefined;
                doc.__v = undefined;
                doc._id = undefined;
                res.status(201).json({ msg: "User Registered" });
              }
            }
          );
      });
  });
});
module.exports = server;
