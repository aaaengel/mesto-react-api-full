const usersRouter = require('express').Router();
const path = require("path");
const fs = require("fs").promises;
const dataPath = path.join(__dirname, '../data/cards');
const mongoose = require("mongoose")
usersRouter.get('/:id', (req, res) => {
fs.readFile(dataPath, { encoding: 'utf8' })
  .then((data) =>{
   const { id } = req.params;
    const users = JSON.parse(data);
    const user = users.find((item) => item._id === id);
    if (!user) {
      res.status(404).send({"message": "Нет пользователя с таким id"});
      return;
      }
      res.status(200).send(user);
  }).catch(() => {
    res.status(500).send({ message: 'Запрашиваемый файл не найден' });
  });
});
usersRouter.get('/users', (req, res) => {
  fs.readFile(dataPath)
    .then((data) => {
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый файл не найден' });
    });
});

// схемы 
const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true, 
    minlength: 2, 
    maxlength: 30 
  },
  about: {
    type: String,
    required: true, 
    minlength: 2, 
    maxlength: 30
  },
  avatar:{
    type: String,
    required: true, 
  }
}); 
module.exports = mongoose.model('user', userSchema);
module.exports = usersRouter;