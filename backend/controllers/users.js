const User = require('../models/userModel');
const {
  NotFound,
  BadRequest,
  ServerError,
} = require('../errors');

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
const updateUserProfile = (req, res, next) => {
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
    res.send(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequest('data is invalid'));
    } if (err.name === 'CastError') {
      return next(new BadRequest('incorrect data'));
    }
    return next(new ServerError('server error'));
  });
};

const updateUserAvatar = (req, res, next) => {
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
      return next(new BadRequest('data is invalid'));
    } if (err.name === 'CastError') {
      return next(new BadRequest('incorrect data'));
    }
    return next(new ServerError('server error'));
  });
};

const getProfile = (req, res, next) => {
  User.findOne(req.user._id)
    .then((user) => res.status(200).send(user)).catch((err) => {
      next(err);
    });
};
module.exports = {
  returnUsers,
  updateUserProfile,
  updateUserAvatar,
  getProfile,
};
