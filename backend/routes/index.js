const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');
const authMiddleware = require('../middlewares/auth');
const { NotFound } = require('../errors');

routes.use('/', authRouter);
routes.use('/users', authMiddleware, usersRouter);

routes.use('/cards', authMiddleware, cardsRouter);

routes.use('/*', () => {
  throw new NotFound('запрашиваемый ресур не найден');
});

module.exports = routes;
