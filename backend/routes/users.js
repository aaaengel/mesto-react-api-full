const usersRouter = require('express').Router();
const {
  createUser, returnUsers, returnUserById, updateUserProfile, updateUserAvatar, getProfile,
} = require('../controllers/users');

usersRouter.get('/:id', returnUserById);
usersRouter.get('/', returnUsers);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);
usersRouter.get('/me', getProfile);
module.exports = usersRouter;
