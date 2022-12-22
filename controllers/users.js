const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { DataError, NotFound } = require('../errors/errors');

function fundUser(res, next, userId) {
  User.findById(userId)
  .orFail(new NotFound('Пользователь не найден'))
  .then((user) => res.send({ user }))
  .catch((err) => {
    if(err.name === 'CastError') {
      next(new )
    }
  })
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => sendErrors(res, err));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound('Пользователя с указанным id не существует');
    })
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => sendErrors(res, err));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => sendErrors(res, err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
  .select('+password')
  .then((user) => {
    if(!user) {прописать ошибку авторизации}
    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if(!matched) { ошибка авторизации}
      const token = jwt.sign({  _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      return res.send({ token });
    });
  })
  .catch(next);
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => sendErrors(res, err));
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => sendErrors(res, err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUserInfo,
  updateAvatar,
};
