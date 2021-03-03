const Card = require('../models/cardModel');
const {
  NotFound,
  BadRequest,
  ServerError,
} = require('../errors');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('invalid data');
      }
      throw new ServerError('server error');
    });
};

const returnCards = (req, res) => {
  Card.find({}).then((cards) => {
    if (!cards.length) {
      throw new NotFound('cards undefined');
    }
    res.send({ data: cards });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('invalid data');
      } else {
        throw new ServerError('server error');
      }
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFound('card undefined');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('invalid data');
      } else {
        throw new ServerError('server error');
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFound('card undefined');
    }
    res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('invalid data');
      } else {
        throw new ServerError('server error');
      }
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFound('card undefined');
    }
    res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('invalid data');
      } else {
        throw new ServerError('server error');
      }
    });
};
module.exports = {
  createCard,
  returnCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
