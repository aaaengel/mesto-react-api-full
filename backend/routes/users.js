const usersRouter = require('express').Router();
const {
  createUser, returnUsers, updateUserProfile, updateUserAvatar, getProfile,
} = require('../controllers/users');

usersRouter.get('/me', getProfile);
usersRouter.get('/', returnUsers);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);
module.exports = usersRouter;
