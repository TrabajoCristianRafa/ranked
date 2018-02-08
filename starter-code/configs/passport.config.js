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
      console.log(accessToken)
      process.nextTick(function() {
        console.log(profile)
        console.log("He llegado a Linkedin")
        User.findOne()
          .then(user => {
            if (user) {
              console.log("Encima", user)
              next(null, user);
              console.log("debajo")
            } else {
              console.log("Aqui tengo que crear un usuario")
              // const email = profile.emails ? profile.emails[0].value : null;
              const newUser = new User({
                linkedinFirstName: profile.firstName || DEFAULT_USERNAME,
                // password: Math.random().toString(36).slice(-8), // FIXME: insecure, use secure random seed
              });
              console.log(newUser)
              newUser.save()
                .then(() => {
                  console.log("entro a save")
                  next(null, user);
                })
                .catch(error => next(error));
            }
          })
          .catch(error => next(error));

        return done(null, profile);
      });
    })
  )
}
