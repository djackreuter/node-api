const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    },
  },
  password: {
    type: String, 
    require: true,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String, 
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var userObj = this.toObject();
  return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
  // let user = this;
  var access = 'auth';
  var token = jwt.sign({_id: this._id.toHexString(), access}, 'abc123').toString();
  this.tokens.push({
    access,
    token
  });
  return this.save().then(() => token);
}

UserSchema.statics.findByToken = function(token) {
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(err) {
    // return Promise.reject();
    return new Promise((resolve, reject) => {
      reject();
    });
  }
  return this.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}