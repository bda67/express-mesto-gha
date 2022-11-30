const routerCards = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routerCards.get('/', getCards);
routerCards.post('/', createCard);
routerCards.delete('/:cardId', deleteCard);
routerCards.delete('/:cardId/likes', dislikeCard);
routerCards.put('/:cardId/likes', likeCard);

module.exports = routerCards;
