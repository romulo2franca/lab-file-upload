/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  path: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
