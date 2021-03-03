const User = require('../models/userModel');
const { NotFound, Unauthorized, Conflict } = require('../errors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const{ JWT_SECRET, JWT_TTL } = require('../config');

const register = (req, res, next) => {
  const {email, password, avatar, name, about} = req.body;

  User.findOne({email})
  .then((user) =>{
    if(user){
      throw new Conflict("email уже используется")
    }
    return bcrypt.hash(password, 10)
})
.then((password) =>{
  return User.create({email, password, name, about, avatar})
})
.then((user) =>{
  res.send(user)
})
  .catch(next)
};

const auth = (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({email}).select("+password")
  .then((user) =>{
    if(!user){
      throw new Unauthorized("Не правильный email или пароль")
    }
    return bcrypt.compare(password, user.password)
    .then((isValid) => {
      if(isValid){
        return user;
      }
      throw new Unauthorized("Не правильный email или пароль")
    })
})
.then((_id) =>{
 const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_TTL })
 res.send({token});
})
  .catch(next)
};

module.exports = {
  auth,
  register,
};
