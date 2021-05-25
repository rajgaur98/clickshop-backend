const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config");

const login = (req, res) => {
  User.find(
    {
      email: req.body.email,
    },
    async (err, user) => {
      try {
        if (err) res.status(400).send(err);
        else if (user.length !== 1)
          res.status(400).send("email or password is incorrect");
        else {
          const validPass = await bcrypt.compare(
            req.body.password,
            user[0].password
          );
          if (!validPass)
            res.status(400).send("email or password is incorrect");
          else {
            const token = jwt.sign({ id: user[0]._id }, config.TOKEN_SECRET);
            res.status(200).header("auth-token", token).send({ token: token });
          }
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );
};

const register = (req, res) => {
  User.find({ email: req.body.email }, async (err, user) => {
    try {
      if (err) res.status(400).send(err);
      else if (user.length > 0) res.status(400).send("User already registered");
      else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        User.create(
          {
            email: req.body.email,
            password: hash,
          },
          (err, user) => {
            if (err) res.send(err);
            else res.status(201).send(user);
          }
        );
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });
};

module.exports = { login, register };
