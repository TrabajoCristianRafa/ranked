const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');

// ABAJO, NECESITAMOS EL loginWithProviderCallback //

module.exports.signup = (req, res, next) => {
  console.log("Hola")
  res.render('signup')
}

module.exports.doSignup = (req, res, next) => {
  User.findOne({
      linkedinId: req.body.id
    })
    .then(user => {
      if (user != null) {
        res.render('signup', {
          user: user,
          error: {
            username: 'Username already exists'
          }
        });
      } else {
        user = new User(req.body);
        user.save()
          .then(() => {
            req.flash('info', 'Successfully sign up, now you can login!');
            res.redirect('/login');
          }).catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('signup', {
                user: user,
                error: error.errors
              });
            } else {
              next(error);
            }
          });
      }
    }).catch(error => next(error));
}

// module.exports.loginWithProviderCallback = (req, res, next) => {
//     passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
//         if(error) {
//             next(error);
//         } else {
//             req.login(user, (error) => {
//                 if (error) {
//                     next(error);
//                 } else {
//                     res.redirect('/profile');
//                 }
//             });
//         }
//     })(req, res, next);
// }
