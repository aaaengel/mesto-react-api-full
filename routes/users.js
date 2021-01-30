const usersRouter = require('express').Router();
const {createUser, returnUsers, returnUserById} = require("../controllers/users")
usersRouter.get('/users/:id', returnUserById);
usersRouter.get('/users', returnUsers);
usersRouter.post('/users', createUser)


module.exports = usersRouter;