const usersRouter = require('express').Router();
const {
  returnUsers, updateUserProfile, updateUserAvatar, getProfile,
} = require('../controllers/users');

usersRouter.get('/me', getProfile);
usersRouter.get('/', returnUsers);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);
module.exports = usersRouter;
