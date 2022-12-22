const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { DataError, NotFound, AuthError } = require('../errors/errors');

function findUser(res, next, userId) {
  User.findById(userId)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Невалидный Id'));
      } else {
        next(err);
      }
    });
}

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res) => {
  findUser(res, next, req.params.userId);
};

const getUserInfo = (req, res, next) => {
  findUser(res, next, req.user._id);
};

const createUser = (req, res, next) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Некорректные данные'));
      } else if (err.code === 11000) {
        res.status(409).send({ message: `${err.message}` });
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) { throw new AuthError('Неверный логин или пароль'); }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { throw new AuthError('Неверный логин или пароль'); }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
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
  getUserInfo,
  createUser,
  login,
  updateUserInfo,
  updateAvatar,
};
