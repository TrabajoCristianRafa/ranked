const User = require('../models/user.model');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const DEFAULT_USERNAME = 'anonymous ironhacker'

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '';
// const LINKEDIN_CB_URL = '/auth/linkedin/cb'

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
      //ESTAS VARIABLES VAN AL ENV //
      clientID: '78frd5p2p2moyo',
      clientSecret: 'E2CNvuddqixrfDMy',
      callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
      scope: ['r_basicprofile', 'r_emailaddress'],
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      req.session.accessToken = accessToken;
      // console.log(accessToken)
      process.nextTick(function() {
        // console.log(profile)
        // console.log("He llegado a Linkedin")
        User.findOne({'linkedinId': profile.id})
          .then(user => {
            if (user) {
              console.log('El usuario existe')
              // next(null, user);
            } else {
              // console.log("Aqui tengo que crear un usuario")
              // const email = profile.emails ? profile.emails[0].value : null;
              const userData = {
                linkedinFirstName: profile.firstName,
                linkedinId: profile.id
              }
              const newUser = new User(userData);
              console.log('imprimo newUser =>')
              console.log(newUser)
              newUser.save()
                .then((user) => {
                  done(null, profile);
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
