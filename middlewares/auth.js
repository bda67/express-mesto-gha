const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/errors');

/*const { NODE_ENV, JWT_SECRET } = process.env;*/
const bearerToken = (header) => header.replace('Bearer', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthError('Вы не авторизированы');
  }
  const token = bearerToken(authorization);
  let playload;

  try {
    playload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthError('Вы не авторизированы');
  }
  req.user = playload;
  return next();
};
