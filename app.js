const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const helmet = require('helmet');
const util = require('util');
const config = require('config');
const bodyParser = require('body-parser');
// const cookies = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const router = require('./routes/index');

const { auth } = require('./middlewares/auth');
const handleErrors = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');
const { messageError } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs'),
  max: config.get('rateLimit.max'),
  standardHeaders: config.get('rateLimit.standardHeaders'),
});

const { DB_URL, NODE_ENV } = process.env;

const mongoServerAddress = util.format(
  'mongodb://%s:%s/%s',
  config.get('mongo.server.host'),
  config.get('mongo.server.port'),
  config.get('mongo.server.db'),
);

const {
  MONGODB_URL = NODE_ENV === 'production' ? DB_URL : mongoServerAddress,
  PORT = 3000 || 4000,
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();
const ALLOWED_CORS = [
  process.env.ALLOWED_ORIGINS_HTTP,
  process.env.ALLOWED_ORIGINS_HTTPS,
  'localhost:3000',
];

app.use((req, res, next) => {
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.end();
  }

  return next();
});

app.use(limiter);

app.use(requestLogger);

app.use(helmet());

// app.use(cookies());
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(auth);

app.use(router);

app.use('/', (req, res, next) => {
  next(new NotFoundError(messageError.notFoundError));
});

app.use(errorLogger);
app.use(handleErrors);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
