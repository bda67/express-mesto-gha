const { celebrate, Joi } = require('celebrate');
const { regex } = require('./utils/constants');

const validationGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const validationUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex),
  }),
});

const validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const validationLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const validationDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationDislikeCard,
  validationLikeCard,
  validationDeleteCard,
  validationCreateCard,
  validationUpdateAvatar,
  validationUpdateUserInfo,
  validationGetUserById,
};
