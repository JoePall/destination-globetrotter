const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      db.user.findOne({
        where: {
          email: email,
        },
      }).then((dbUser) => {
        if (!dbUser) {
          return done(null, false, {
            message: "No account was associated with the email provided.",
          });
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "The password entered was incorrect.",
          });
        }
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

module.exports = passport;
