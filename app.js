const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((err, req, res, next) => {
  if (err.name === 'SyntaxError') {
    return (res.status(400).send({ message: 'incorrect data' }));
  } if (err.name === 'MongooseError') {
    return (res.status(500).send({ message: 'server error' }));
  }

  return next();
});
app.use((req, res, next) => {
  req.user = {
    _id: '6016d1147d8a233cdcf6c75f',
  };

  next();
});

app.use('/', routes);

app.use(errorHandler);
app.listen(PORT);
