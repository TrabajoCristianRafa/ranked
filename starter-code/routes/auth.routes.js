const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');

router.post('/linkedin', passport.authenticate('linkedin-auth', { scope: ['r_basicprofile', 'r_emailaddress'] }));
router.get('/linkedin/profile', authController.profile);
router.get('/linkedin/callback', authController.loginWithProviderCallback)

module.exports = router;
