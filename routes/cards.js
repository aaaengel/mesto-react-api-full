const cardsRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose')
const dataPath = path.join(__dirname, "../data/cards");
cardsRouter.get('/', (req, res) => {

  fs.readFile(dataPath)
    .then((data) => {
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый файл не найден' });
    });
});

const cardsSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength:2,
    maxlength:30,
    required:true
  },
link:{
  type:String,
  required:true,
},
owner:{
  type:ObjectId,
  required:true,
},
likes:{
type:ObjectId,
default:[],
},
createdAt:{
  type:Date,
  deafault: Date.now
}
})
module.exports = mongoose.model('card', cardsSchema);
module.exports = cardsRouter;