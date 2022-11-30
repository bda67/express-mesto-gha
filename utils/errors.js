class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const setErrors = (res, err) => {
  if (err.name === 'NotFoundError') {
    return res.status(404).send({ message: `${err.message}` });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: `${err.message}` });
  }
  return res.status(500).send({ message: `${err.message}` });
};

module.exports = {
  setErrors,
  NotFound,
};
