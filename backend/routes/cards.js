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
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
