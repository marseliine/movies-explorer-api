const constants = require('../constants');

const codeSuccess = {
  OK: 200,
};

const codeCreated = {
  OK: 201,
};

const codeError = {
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  FORBIDDEN: 403,
};

const messageSuccess = {
  okMessage: constants.okMessage,
};

const messageError = {
  badDataError: constants.badDataError,
  defaultError: constants.defaultError,
  notFoundError: constants.notFoundError,
  UnauthorizedError: constants.UnauthorizedError,
  ForbiddenError: constants.ForbiddenError,
  ConflictError: constants.ConflictError,
};

module.exports = {
  codeSuccess,
  codeCreated,
  codeError,
  messageSuccess,
  messageError,
};
