const router = require('express').Router();
const {
  register, auth,
} = require('../controllers/auth');
const registerValidator = require('../middlewares/validators/register')
router.post('/signup', registerValidator, register);
router.post('/signin', auth);

module.exports = router;
