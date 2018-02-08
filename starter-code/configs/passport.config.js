// REVISAR, HE INTRODUCIDO MI KEY Y SECRET // 



const User = require('../models/user.model');
const LinkedinStrategy = require('passport-linkedin').Strategy;

const DEFAULT_USERNAME = 'anonymous ironhacker'

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '';
const LINKEDIN_CB_URL = '/auth/linkedin/cb'

const LINKEDIN_PROVIDER = 'linkedin';

module.exports.setup = (passport) => {
  passport.serializeUser((user, next) => {
    next(null, user._id);
  })

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => {
        next(null, user);
      })
      .catch(error => next(error))
  })

  passport.use(new LinkedinStrategy({
      consumerKey: '78frd5p2p2moyo',
      consumerSecret: 'E2CNvuddqixrfDMy',
      callbackURL: LINKEDIN_CB_URL
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  ));
}
