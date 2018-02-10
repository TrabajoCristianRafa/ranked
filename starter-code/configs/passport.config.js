const User = require('../models/user.model');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const DEFAULT_USERNAME = 'anonymous ironhacker'

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '';


const LINKEDIN_PROVIDER = 'linkedin';

module.exports.setup = (passport) => {

  passport.serializeUser((user, next) => {
    next(null, user);
  })

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then((user) => {
        next(null, user);
      })
      .catch(error => next(error))
  })

  passport.use('linkedin-auth', new LinkedInStrategy({
      clientID: '78frd5p2p2moyo',
      clientSecret: 'E2CNvuddqixrfDMy',
      callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
      scope: ['r_basicprofile', 'r_emailaddress'],
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      req.session.accessToken = accessToken;
      process.nextTick(function() {
        console.log(profile)
        User.findOne({'linkedinId': profile.id})
          .then(user => {
            if (user) {
              console.log('El usuario existe')
            } else {
              const newUser = new User();
              newUser.linkedinName = profile.displayName;
              newUser.linkedinId = profile.id;
              console.log('imprimo newUser =>')
              console.log(newUser)
              newUser.save()
                .then((user) => {
                  done(null, user);
                })
                .catch(error => {
                  next(error)
                });
            }
          })
          .catch(error => next(error));
      });
    })
  )
}
