const Card = require('../models/cardModel');
const {
  NotFound,
  BadRequest,
  ServerError,
  Forbidden,
} = require('../errors');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('invalid data'));
      }
      return next(new ServerError('server error'));
    });
};

const returnCards = (req, res, next) => {
  Card.find({}).then((cards) => {
    if (!cards.length) {
      return next(new NotFound('cards undefined'));
    }
    res.send({ data: cards });
    return next();
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('invalid data'));
      }
      return next(new ServerError('server error'));
    });
  return next();
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return next(new NotFound('card undefined'));
      }
      if (!card.owner.equals(req.user._id._id)) {
        return next(new Forbidden('Нет прав на удаление чужой карточки'));
      }
      Card.findByIdAndRemove(req.params.id)
        .then((deletedCard) => res.status(200).send({ data: deletedCard }))
        .catch(next);
      return next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('invalid data'));
      }
      return next(new ServerError('server error'));
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new NotFound('card undefined'));
    }
    res.send({ data: card });
    return next();
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('invalid data'));
      }
      return next(new ServerError('server error'));
    });
  return next();
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new NotFound('card undefined'));
    }
    res.send({ data: card });
    return next();
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(' incorrect data '));
      }
      return next(new ServerError('server error'));
    });
  return next();
};
module.exports = {
  createCard,
  returnCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
