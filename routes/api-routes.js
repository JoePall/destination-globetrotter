const passport = require('../config/passport');
const db = require('../models');
const express = require('express');
const router = express.Router();
// const path = require('path');
// const fs = require('fs');
// const util = require('util');

// Create User
router.post('/api/signup', function (req, res, cb) {
    let user =  db.User.findOrCreate({
        where: {email: req.body.email},
        defaults: req.body,
    })

    cb();

    if (Array.isArray(user)) user = user[0];
    req.login(user, function (err) {
        if (!err) {
            res.json(user.dataValues.id);
        }
    })
});

// Log the User in with passport -- creates req.user
router.post('/api/login', passport.authenticate('local'), function(req,res,cb) {
    const dbUser = db.User.findOne({
        where: {
            email: req.body.email,
        }
    });
    cb();
    res.json(dbUser.id);
});

// Log the user out
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;