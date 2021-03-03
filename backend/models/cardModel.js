const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    match: /https?:\/\/\S+(?:\.[a-zA-Z]{2,8})\/\S+/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',

  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    deafault: Date.now,
  },
});
module.exports = mongoose.model('card', cardsSchema);
