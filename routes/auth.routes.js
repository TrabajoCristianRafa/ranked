const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');
const secure = require('../middleware/secure.middleware');

router.post('/linkedin', passport.authenticate('linkedin-auth', { scope: ['r_basicprofile', 'r_emailaddress', 'w_share'] }));
router.get('/linkedin/profile', authController.profile);
router.get('/linkedin/callback', authController.loginWithProviderCallback)

router.get('/logout', authController.logout);

module.exports = router;
