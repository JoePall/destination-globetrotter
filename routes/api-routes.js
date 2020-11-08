const passport = require('../config/passport');
const db = require('../models');
const express = require('express');
const router = express.Router();

// Create User
router.post('/api/signup', function (req, res, cb) {
    let user =  db.User.findOrCreate({
        where: {username: req.body.username},
        defaults: req.body,
    })

    cb();

    if (Array.isArray(user)) user = user[0];
    req.login(user, function (err) {
        if (!err) {
            res.json(user.dataValues.id);
            if (req.user) {
                res.redirect("/");
              } else {
                res.redirect("/login");
              }
        }
    }) 
});

// Log the User in with passport -- creates req.user
router.post('/api/login', passport.authenticate('local'), function(req,res,cb) {
    const dbUser = db.User.findOne({
        where: {
            username: req.body.username,
        }
    });
    cb();
    res.json(dbUser.id);
    if (req.user) {
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
});

// Log the user out
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;