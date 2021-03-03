const mongoose = require('mongoose');
const User = require('../models/userModel');
const {
  NotFound,
  BadRequest,
  ServerError,
} = require('../errors');

const { ObjectId } = mongoose.Types;

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('invalid data');
      } else if (err.name === 'CastError') {
        throw new BadRequest('invalid data');
      } else {
        throw new ServerError('server error');
      }
    });
};

const returnUsers = (req, res) => {
  User.find({}).then((users) => {
    if (!users.length) {
      throw new NotFound('users undefined');
    }
    res.send({ data: users });
  })
    .catch(() => {
      throw new ServerError('server error');
    });
};

const returnUserById = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    throw new BadRequest('сервер не смог обработать запрос');
  }
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFound('user undefined');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('incorrect data');
      } else {
        throw new ServerError('server error');
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
      throw new BadRequest('data is invalid');
    } else if (err.name === 'CastError') {
      throw new BadRequest('incorrect data');
    } else {
      throw new ServerError('server error');
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
      throw new NotFound('user not found');
    }
    res.send({ data: user });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      throw new BadRequest('data is invalid');
    } else if (err.name === 'CastError') {
      throw new BadRequest('data is incorrect');
    } else {
      throw new ServerError('server error');
    }
  });
};

const getProfile = (req, res, next) => {
  User.findOne(req.user._id)
    .then((user) => res.status(200).send(user)).catch((err) => {
      next(err);
    });
};
module.exports = {
  createUser,
  returnUsers,
  returnUserById,
  updateUserProfile,
  updateUserAvatar,
  getProfile,
};
