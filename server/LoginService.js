const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleTokenStrategy = require('passport-google-id-token');
const router = require('express').Router();
function ensureLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login')
}
// google auth
passport.use(new GoogleTokenStrategy({
    clientID: "1082570532123-me6irfvs9fn0h55vgu9ntg8dia9u8ems.apps.googleusercontent.com",
    clientSecret: "TNiIEutkRGL1zIUdcdyn-NDE"
  },
  function(parsedToken, googleId, done) {
    User.findOrCreate({ googleId: googleId }, function (err, user) {
      return done(err, user);
    });
  }
));
// TODO:THIS PIECE youtube.com/watch?v=c_FRNFZENjw
// router.get('/login',);

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
];

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

