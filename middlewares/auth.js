const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new AuthError('Вы не авторизированы'));
  }
  const token = req.cookies.jwt;
  let playload;

  try {
    playload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    req.users = playload;
    next();
  } catch (err) {
    next(new AuthError('Вы не авторизированы'));
  }
  req.user = playload;
  return next();
};
