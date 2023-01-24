const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/errors');

const bearerToken = (header) => header.replace('Bearer', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new AuthError('Вы не авторизированы поч'));
  }
  const token = bearerToken(authorization);
  let playload;
  try {
    playload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthError('Вы не авторизированы fghm,'));
  }
  req.user = playload;
  return next();
};
