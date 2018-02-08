const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controller');
const passport = require('passport');

router.get('/signup', authControllers.signup);

// ¿NECESITAMOS ESTE doSignup? 

router.post('/signup', authControllers.doSignup);

// NOS HACE FALTA ALGO COMO LO DE ABAJO QUE MANDE EL POST Y QUE LANCE EL PASSPORT authenticate

// router.post('/linkedin', passport.authenticate('linkedin-auth', { scope: ['linkedinId'] }));
// router.get('/:provider/cb', authControllers.loginWithProviderCallback)

module.exports = router;
