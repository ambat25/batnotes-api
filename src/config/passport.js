const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { models } = require('../utils/constants');

const Users = mongoose.model(models.USER);

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));
