const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  // there should be a user object set on req
  // use that req.user object to create a user and save it to our Mongo instance.
  const { username }  = req.body;
  const password = req.password;
  const newUser = new User({ username, password });
  console.log('Hello');
  newUser.save((err, savedUser) => {
    if (err) {
      res.status(422).json({ 'Need both username and password': err.message })
      return;
    };
    res.status(200).json(savedUser);
  });

};    

module.exports = {
  createUser
};
