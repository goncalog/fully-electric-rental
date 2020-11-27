const Owner = require('../models/owner');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport for handling user sessions (e.g. log in)
passport.use(
    new LocalStrategy((username, password, done) => {
      Owner.findOne({ contact: username }, async (err, user) => {
        if (err) { return done(err); }
  
        if (!user) {
          return done(null, false, { msg: 'Incorrect email' });
        }
  
        try {
          let result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, { msg: 'Incorrect password' });
          }
        } catch(err) {
          return done(err);
        }
  
        return done(null, user);
      });
    })
  );
  
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Owner.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
