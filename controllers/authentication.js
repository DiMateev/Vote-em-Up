const jwt= require('jwt-simple');
const path = require('path');
const axios = require('axios');

const User = require('../models/user');

var providers = {
  facebook: {
      url: 'https://graph.facebook.com/me'
  }
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ prn: user._id, iat: timestamp }, process.env.SECRET);
}

function validateWithProvider(network, socialToken) {
  return new Promise(function (resolve, reject) {
      // Send a GET request to Facebook with the token as query string
      axios.get(`${providers[network].url}?fields=id,name,email&access_token=${socialToken}`)
        .then((response) => {
          // console.log('PROFILE:', response);
          if (!response.error && response.status == 200) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch(e => console.log('validateWithProvider:', e));
  });
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
      'local.password': password
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

exports.authenticate = (req, res, next) => {
  const token = req.header('x-auth');
}

exports.authenticateWithProvider = (req, res, next) => {
  // Grab the social network and token
  const network = req.body.network;
  const socialToken = req.body.socialToken;

  console.log(network, socialToken);

  // Validate the social token with Facebook
  validateWithProvider(network, socialToken).then(function (profile) {
    console.log('-----====== PROFILE =====-----')
    console.log(profile)
    console.log('-----====== PROFILE =====-----')
    User.findOne({email: profile.email}, (err, user) => {
      if (err) return next(err);

      if (!user) {
        var user = new User({
          'email': profile.email,
          'facebook.id': profile.id,
          'facebook.name': profile.name
        });
    
        user.save((err) => {
          if (err) { return next(err); }
        });
      }
      // Return token for the user
      res.json({ token: tokenForUser(user) });
    })
  }).catch(function (err) {
      res.send('Failed!' + err.message);
  });
};

exports.fetchSurveyList = async (req, res, next) => {
  const token = req.header('x-auth');
  
  res.json({ surveyList: req.user.surveys });
}