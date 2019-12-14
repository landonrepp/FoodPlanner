const passport = require('passport');
const Constants = require('./Constants');
const jwt = require('jsonwebtoken');
const GoogleTokenStrategy = require('passport-google-oauth20').Strategy;
const router = require('express').Router();
const ExpressSesssion = require("express-session");
var MySQLStore = require('express-mysql-session')(ExpressSesssion);
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
];
const uuid = require("uuid/v4");
var sessionStore = new MySQLStore(Constants.DatabaseLogin);
const SessionObj = {
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
    },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store:sessionStore
}

function ensureLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login/google')
}

// google auth
passport.use(new GoogleTokenStrategy({
    clientID: "1082570532123-me6irfvs9fn0h55vgu9ntg8dia9u8ems.apps.googleusercontent.com",
    clientSecret: "TNiIEutkRGL1zIUdcdyn-NDE",
    callbackURL: '/login/return',
    scope:defaultScope
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

// add & configure middleware
router.use(ExpressSesssion(SessionObj))

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

router.get('/google/',passport.authenticate('google'));



router.get('/return', 
    passport.authenticate('google', { failureRedirect: '/login/google' }),
    function(req, res) {
        res.redirect(301,Constants.CrossOriginURL);
    }
);

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
    });
}

/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
}

module.exports = {router,passport, SessionObj};

