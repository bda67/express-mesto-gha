const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AllErrors');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let playload;
  try {
    playload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthError('Вы не авторизированы :('));
  }
  req.user = playload;
  return next();
};

module.exports = auth;
