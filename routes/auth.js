const initAuthRoutes = require('express').Router();
const { registerValidation, loginValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');

initAuthRoutes.post('/signin', loginValidation, login);
initAuthRoutes.post('/signup', registerValidation, createUser);

module.exports = initAuthRoutes;
