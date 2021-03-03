const Card = require('../models/cardModel');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `data is invalid:${err}` });
        return;
      }
      res.status(500).send({ message: 'server error' });
    });
};

const returnCards = (req, res) => {
  Card.find({}).then((cards) => {
    if (!cards.length) {
      res.status(404).send({ message: 'Cards undefined' });
      return;
    }
    res.send({ data: cards });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({ message: 'server error' });
      }
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card undefined' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({ message: 'server error' });
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
      res.status(404).send({ message: 'Card not found' });
      return;
    }
    res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({ message: 'server error' });
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
      res.status(404).send({ message: 'Card not found' });
      return;
    }
    res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'incorrect data' });
      } else {
        res.status(500).send({ message: 'server error' });
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
