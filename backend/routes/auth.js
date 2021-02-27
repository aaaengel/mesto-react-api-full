const router = require('express').Router();
const {
  register, auth,
} = require('../controllers/auth');
const registerValidator = require('../middlewares/validators/register')
router.post('/singup', registerValidator, register);
router.post('/singin', auth);

module.exports = router;
