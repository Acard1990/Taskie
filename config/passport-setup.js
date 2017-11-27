const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.Google_ClientID,
        clientSecret: process.env.Google_ClientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        db.User.findOne({
          where: {
            googleId: profile.id
            }
          }).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                db.User.create({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    googleId: profile.id,
                    thumbnail: profile._json.image.url
                }).then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    }, (req, email, password, done) => {
      db.User.findOne({
        where: {
          username: email
        }
    }).then((user) => {
        if (user) {
          return done(null, false, { message: 'That email is already taken' });
        } else {
            db.User.create({
              username: email,
              password: password,
              firstName: req.body.firstName,
              lastName: req.body.lastName
            }).then((newUser, created) => {
                if (!newUser) {
                  return done(null, false);
                }
                if (newUser) {
                  return done(null, newUser);
                }
            });
        }
    });
    }
));

passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        db.User.findOne({
            where: {
                username: email
            }
        }).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Email does not exist' });
            }
            if (!password) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            var userinfo = user.get();
            return done(null, userinfo);
        }).catch((err) => {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
));
