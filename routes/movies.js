const initMoviesRoutes = require('express').Router();
const {
  getMovies, addMovie, deleteMovie,
} = require('../controllers/movies');
const { validationCreateMovie, movieIdValidation } = require('../middlewares/validation');

initMoviesRoutes.get('/', getMovies);
initMoviesRoutes.post('/', validationCreateMovie, addMovie);
initMoviesRoutes.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = initMoviesRoutes;
