const usersRouter = require('express').Router();
const {
  createUser, returnUsers, returnUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/:id', returnUserById);
usersRouter.get('/', returnUsers);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
