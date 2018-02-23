const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.profile = (req, res, next) => {
  res.render('profile');
}

module.exports.loginWithProviderCallback = (req, res, next) => {
    passport.authenticate('linkedin-auth' ,(error, user) => {
      if(error) {
          next(error);
      } else {
        req.login(user, (error) => {
          if (error) {
            next(error);
          } else {
            res.redirect('profile');
          }
        });
      }
    })(req, res, next);
}

module.exports.logout = (req, res, next) => {
  console.log("Estoy en el controller")
  req.logout();
  res.redirect('/');
}
