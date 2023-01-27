const NotFound = require('./NotFoundError');
const AuthError = require('./AuthError');
const DataError = require('./DataError');
const ForbiddenError = require('./ForbiddenError');
const ConflictError = require('./ConflictError');

module.exports = {
  NotFound,
  AuthError,
  DataError,
  ForbiddenError,
  ConflictError,
};
