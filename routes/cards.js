const cardsRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
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


module.exports = cardsRouter;