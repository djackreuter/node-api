const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}