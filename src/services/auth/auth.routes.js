const router = require('express').Router();
const { login, register, logout } = require('./auth.controller')
const AuthValidator = require('./auth.validator')

router.post('/login', AuthValidator.login, login);
router.post('/logout', logout);
router.post('/register',  AuthValidator.register, register);

module.exports = router;
