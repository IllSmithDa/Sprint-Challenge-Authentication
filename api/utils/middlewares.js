const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  // Once the password is encrypted using bcrypt, you'll need to save the user the DB.
  // Once the user is set, take the savedUser and set the returned document from Mongo on req.user
  // call next to head back into the route handler for encryptUserPW
  if (!password) {
    res.status(422).json('Error: must provide a password');
    return;
  };
  bcrypt
    .hash(password, SaltRounds)
    .then(pw => {
      req.password = pw;
      next();
    })
    .catch(err => {
      throw new Error(err);
    });
};

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();
  if (!username) {
    res.status(422).json('Error: Must provide a username');
  };
  User.findOne({ username }, (err, user) => {
    if (user || err === null) {
      res.status(422).json('username does not exist');
    };
    const hashedPw = user.password;
    bcrypt
      .compare(password, hashedPw)
      .then(response => {
        if (!response ) {
          throw new Error(err);
        };
        req.username = user.username;
        next();
      })
      .catch(err2 => {
        res.status(422).json('username/password does not match');
      });
  });
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
