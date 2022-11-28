const routerCards = require('express').Router();
const {
  getCards,
  creatCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards')

routerCards.get('/', getCards);
routerCards.post('/', creatCard);
routerCards.delete('/:cardId', deleteCard);
routerCards.delete('/:cardId/likes', dislikeCard);
routerCards.put('/:cardId/likes', likeCard);

module.exports = routerCards;