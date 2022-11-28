const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() =>
      res.status(500).send({ message: "Произошла внутренняя ошибка сервера" })
    );
};

const creatCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => re.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({
            message: "Переданы некорректные данные в методы создания карточки",
          });
      }
      return res
        .status(500)
        .send({ message: "Произошла внутренняя ошибка сервера" });
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: "Карточка не найдена" });
      } else {
        card.remove().then(() => res.send(card));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({
            message: "Переданы некорректные данные в методы создания карточки",
          });
      }
      return res
        .status(500)
        .send({ message: "Произошла внутренняя ошибка сервера" });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({
            message: "Переданы некорректные данные для постановки лайка. ",
          });
      }
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным id не найдена." });
      }
      return res
        .status(500)
        .send({ message: "Произошла внутренняя ошибка сервера" });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({
            message: "Переданы некорректные данные для постановки лайка. ",
          });
      }
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным id не найдена." });
      }
      return res
        .status(500)
        .send({ message: "Произошла внутренняя ошибка сервера" });
    });
};

module.exports = {
  getCards,
  creatCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
