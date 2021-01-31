const usersRouter = require('express').Router();
const {createUser, returnUsers, returnUserById} = require("../controllers/users")
usersRouter.get('/:id', returnUserById);
usersRouter.get('/', returnUsers);
usersRouter.post('/', createUser)


module.exports = usersRouter;