const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.signup = (req, res, next) => {
  console.log("Hola")
  res.render('signup')
}

// REVISAR ESTE LINKEDIN //
module.exports.loginWithProviderCallback = (req, res, next) => {
  console.log('IMPRIMO REQ.PARAMS =>  ')
  console.log(req.query);
    passport.authenticate('linkedin-auth', (error, user) => {
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
