const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controller')

router.get('/signup', authControllers.signup);
router.post('/signup', authControllers.doSignup);

module.exports = router;
