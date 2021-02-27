const router = require('express').Router();
const {
  register, auth,
} = require('../controllers/auth');
const registerValidator = require('../middlewares/validators/register')
router.post('/register', registerValidator, register);
router.post('/auth', auth);

module.exports = router;
