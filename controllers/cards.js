const Card = require('../models/card');
const { sendErrors, NotFound } = require('../errors/AllErrors');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => sendErrors(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => sendErrors(res, err));
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFound('Карточка с таким id не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => sendErrors(res, err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFound('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => sendErrors(res, err));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFound('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => sendErrors(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
