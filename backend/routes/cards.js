const cardsRouter = require('express').Router();
const {
  createCard,
  returnCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.delete('/:id', deleteCardById);
cardsRouter.get('/', returnCards);
cardsRouter.post('/', createCard);
cardsRouter.put('/likes/:cardId', likeCard);
cardsRouter.delete('/likes/:cardId', dislikeCard);

module.exports = cardsRouter;
