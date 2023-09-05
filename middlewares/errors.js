const { isCelebrateError } = require('celebrate');
const { messageError } = require('../errors/errors');

const handleErrors = (error, req, res, next) => {
  let statusCode;
  let message;
  if (isCelebrateError(error)) {
    statusCode = 400;
    message = messageError.badDataError;
  } else {
    statusCode = error.statusCode || 500;
    message = statusCode === 500 ? 'На сервере произошла ошибка' : error.message;
  }
  res.status(statusCode).send({ message });
  next();
};

module.exports = handleErrors;
