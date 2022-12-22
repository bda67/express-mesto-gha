const ERROR_CODE = 400;
const NOTFOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;
const CREATED_CODE = 201;
const SUCCESS_CODE = 200;
const regex = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports = {
  ERROR_CODE,
  NOTFOUND_CODE,
  SERVER_ERROR_CODE,
  CREATED_CODE,
  SUCCESS_CODE,
  regex,
};
