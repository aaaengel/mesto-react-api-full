const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');

routes.use('/', authRouter);
routes.use('/users', usersRouter);

routes.use('/cards', cardsRouter);

routes.use('/*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = routes;
