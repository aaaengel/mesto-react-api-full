/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    match: /https?:\/\/\S+(?:\.[a-zA-Z]{2,8})\/\S+/,
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Укажите корректный Email!',
    },
    unique: true,
  },
});
module.exports = mongoose.model('User', userSchema);
