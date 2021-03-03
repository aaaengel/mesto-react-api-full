const jwt = require("jsonwebtoken");
const{ JWT_SECRET } = require('../config');
const { Forbidden } = require('../errors')

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization){
    throw new Forbidden("Нет токена");
  }
  let payload;
  const token = authorization.replace(/^Bearer /, "");

  try{
    payload = jwt.verify(token, JWT_SECRET);

  } catch(err){
    throw new Forbidden('Нет токена');
  }
  req.user = payload;

  next();

}


module.exports = auth;