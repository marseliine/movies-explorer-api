const router = require('express').Router();

const moviesRoutes = require('./movies');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/movies', moviesRoutes);
router.use('/users', usersRoutes);
router.use('/', authRoutes);

module.exports = router;
