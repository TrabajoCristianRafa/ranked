const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');

router.get('/signup', authController.signup);
router.post('/auth/linkedin', passport.authenticate('linkedin-auth', { scope: ['r_basicprofile', 'r_emailaddress'] }));
router.get('/auth/linkedin/callback', authController.loginWithProviderCallback)

module.exports = router;
