const express = require("express");
const bcrypt = require("bcryptjs");
const server = express.Router();
const jwt = require("jsonwebtoken");

let userModel = require("../models/user.model");

server.route("/login").post((req, res, next) => {
  userModel.findOne({ username: req.body.username }, (err, doc) => {
    if (err) next(err);
    else {
      if (doc !== null) {
        bcrypt.compare(req.body.password, doc.password, (err, isRight) => {
          if (isRight) {
            const token = jwt.sign(
              { _id: doc._id, name: doc.name },
              process.env.SECRET,
              {
                expiresIn: 900,
              }
            );
            res.header("auth-token", token).send(token);
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
                res.status(201).json({ msg: "User Registered" });
              }
            }
          );
      });
  });
});
module.exports = server;
