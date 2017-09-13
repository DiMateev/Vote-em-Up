const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

// Define our user model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  local: {
    password: String
  },
  facebook: {
    id: String,
    name: String
  },
  surveys: []
});

// Hash password, on save hook
// Before saving a model run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  if (!this.local.password) { return next(); }
  const user = this.local;

  // Generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // hash (enrypt) using the salt, run callback
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // overwrite plain password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePasswords = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.local.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;