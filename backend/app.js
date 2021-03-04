const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(errorLogger);
app.use((err, req, res, next) => {
  if (err.name === 'SyntaxError') {
    return (res.status(400).send({ message: 'incorrect data' }));
  } if (err.name === 'MongooseError') {
    return (res.status(500).send({ message: 'server error' }));
  }

  return next();
});
app.use('/', routes);

app.use(errorHandler);
app.listen(PORT);
