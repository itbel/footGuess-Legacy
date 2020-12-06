const express = require("express");
const bcrypt = require("bcryptjs");
const server = express.Router();
const jwt = require("jsonwebtoken");
const validateLogin = require("./validateLogin");

let userModel = require("../models/user.model");

server.route("/login").post((req, res, next) => {
  if (req.body.username !== "" && req.body.password !== "") {
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
                  expiresIn: 9000,
                }
              );
              res.header("auth-token", token).send({ token: token, name: doc.name });
            } else res.status(401).json({ msg: "Invalid Password" });
          });
        } else {
          res.status(401).json({ msg: "User not found" });
        }
      }
    });
  } else {
    res.status(401).json({ msg: "Fields cannot be empty" });
  }
});

server.route("/register").post((req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    else {
      let validate = validateLogin(req.body.username, req.body.password);
      console.log(validate);
      if (validate.accepted) {
        userModel.findOne({ username: req.body.username }, (err2, doc2) => {
          if (err2) next(err2);
          else {
            if (doc2 === null) {
              bcrypt.hash(req.body.password, salt, (err3, hash) => {
                if (err3) next(err3);
                else
                  userModel.create(
                    {
                      username: req.body.username,
                      password: hash,
                      name: req.body.name,
                      email: req.body.email,
                    },
                    (err4, doc3) => {
                      if (err4) next(err4);
                      else {
                        res.status(201).json({ msg: "User Registered" });
                      }
                    }
                  );
              });
            } else {
              res.status(422).json({ msg: "Username already taken." });
            }
          }
        });
      } else {
        res.status(422).json({ msg: validate.msg });
      }
    }
  });
});

module.exports = server;
