const express = require("express");
const userData = require("../models/user-models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");
const router = express();

router.use(express.json());

router.get("/users", (req, res) => {
  userData
    .getUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log("get error", err);
      res.status(500).json({ errorMessage: "cannot get users at this time" });
    });
});

router.post("/register", (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hash;
  userData
    .register(newUser)
    .then(() => {
      res.status(200).json({ successMessage: "you have created a new user" });
    })
    .catch(err => {
      console.log("register error", err);
      res.status(500).json({
        errorMessage:
          "having issues registering users at this time, please try again later"
      });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  userData
    .login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `welcome ${user.username}` });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(err => {
      console.log("login error", err);
      res.status(500).json({ errorMessage: "issue logging in" });
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    userid: user.id
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
