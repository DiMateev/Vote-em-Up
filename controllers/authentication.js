const jwt= require('jwt-simple');

const User = require('../models/user');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ prn: user._id, iat: timestamp }, process.env.SECRET);
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password!' })
  }

  // See if user with given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If a user with this email exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use!' });
    }

    // If it doesn't exist create and save record
    const user = new User({
      email,
      password
    });

    user.save((err) => {
      if (err) { return next(err); }

      // Respond to request indicating that user was created
      res.json({ token: tokenForUser(user) });

    });
  });
}

exports.signin = (req, res, next) => {
  // User already has his email and password auth'd
  // We just need to give them token
  res.json({ token: tokenForUser(req.user) });
}

exports.authenticate = async (req, res, next) => {
  const token = req.header('x-auth');
}