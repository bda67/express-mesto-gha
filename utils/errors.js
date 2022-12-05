const { NOTFOUND_CODE, ERROR_CODE, SERVER_ERROR_CODE } = require('./constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const sendErrors = (res, err) => {
  if (err.name === 'NotFoundError') {
    return res.status(NOTFOUND_CODE).send({ message: `${err.message}` });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(ERROR_CODE).send({ message: `${err.message}` });
  }
  return res.status(SERVER_ERROR_CODE).send({ message: `${err.message}` });
};

module.exports = {
  sendErrors,
  NotFound,
};
