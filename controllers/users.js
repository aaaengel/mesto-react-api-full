const mongoose = require('mongoose');
const User = require('../models/userModel');

const { ObjectId } = mongoose.Types;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: ' data is invalid' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({ message: 'server error' });
      }
    });
};

const returnUsers = (req, res) => {
  User.find({}).then((users) => {
    if (!users.length) {
      res.status(404).send({ message: 'Users undefined' });
      return;
    }
    res.send({ data: users });
  })
    .catch(() => res.status(500).send({ message: 'server error' }));
};

const returnUserById = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send({ message: 'Cервер не смог обработать запрос' });
    return;
  }
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не существует' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({ message: 'server error' });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    { new: true, runValidators: true },

  ).then((user) => {
    if (!user) {
      res.status(404)
        .send({ message: 'User not found' });
      return;
    }
    res.send({ data: user });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'data is invalid' });
    } else if (err.name === 'CastError') {
      res.status(400).send({ message: 'incorrect data' });
    } else {
      res.status(500).send({ message: 'server error' });
    }
  });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    { new: true, runValidators: true },

  ).then((user) => {
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
    res.send({ data: user });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'data is invalid' });
    } else if (err.name === 'CastError') {
      res.status(400).send({ message: 'incorrect data' });
    } else {
      res.status(500).send({ message: 'server error' });
    }
  });
};

module.exports = {
  createUser,
  returnUsers,
  returnUserById,
  updateUserProfile,
  updateUserAvatar,
};
