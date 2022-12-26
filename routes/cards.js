const routerCards = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validationDislikeCard,
  validationLikeCard,
  validationDeleteCard,
  validationCreateCard,
} = require('../Validation');

routerCards.get('/', getCards);
routerCards.post('/', validationCreateCard, createCard);
routerCards.delete('/:cardId', validationDeleteCard, deleteCard);
routerCards.delete('/:cardId/likes', validationDislikeCard, dislikeCard);
routerCards.put('/:cardId/likes', validationLikeCard, likeCard);

module.exports = routerCards;
