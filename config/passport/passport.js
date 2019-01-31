const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/database/User');

module.exports = (passport) => {
    passport.use(
        new localStrategy({ usernameField: 'email'}, async (email, password, done) => {
            try {
                const userMatch = await User.findOne({ email: email });
                if(!userMatch) {
                    return done(null, false,  { message: 'Incorrect E-mail or password'});
                }
                bcrypt.compare(password, userMatch.password, (error, isMatch) => {
                    if(error) throw error;
                    if(!isMatch) return done(null, false,  { message: 'Incorrect E-mail or password'});
                    return done(null, userMatch);
                });
            } catch(error) {
                console.log(error);
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });
}