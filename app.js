const express = require('express');
const path = require('path');
const routes = require('./routes');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT)

