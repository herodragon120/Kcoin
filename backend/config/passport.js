var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/wallet');
var md5 = require('md5');

module.exports = function(passport){
    //Passport configuration
    passport.serializeUser(function(user, done) {
        console.log('user:')
        console.log(user._id)
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('id:')
        console.log(id)
        User.findById(id, function(err, user) {
            done(err, user);
        });
        done(null, id);
    });

    passport.use('local-signin',new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback: true,
        },
        function(req, username, password, done) {
            process.nextTick(function () {
                User.findOne({'username': username}, function (err, user) {
                    // console.log(user)
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }
                    else if (user.password !== md5(password)) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    return done(null, user);
                });
            })
        }
    ));
}


