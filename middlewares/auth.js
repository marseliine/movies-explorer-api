const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messageError } = require('../errors/errors');

const { JWT_SECRET, NODE_ENV } = process.env;

const BEARER_PREFIX = 'Bearer ';

const auth = (req, res, next) => {
  if (!/(https?:\/\/)?(www\.)?.*\/users.*|(https?:\/\/)?(www\.)?.*\/movies.*/.test(req.url)) {
    return next();
  }
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(BEARER_PREFIX)) {
    return next(new UnauthorizedError(messageError.UnauthorizedError));
  }

  const token = authorization.replace(BEARER_PREFIX, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError(messageError.UnauthorizedError));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
