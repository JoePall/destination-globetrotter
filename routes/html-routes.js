const express = require('express');
const db = require('../models');
const router = express.Router();

// Middleware to see if user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/signUp', function (req, res) {
    res.redirect('signUp');
});

router.get('/search-flights', isAuthenticated, function (req, res) {
    res.redirect('search-flights');
});

router.get('/login', function (req, res) {
    res.redirect('login');
});

// add isAuthentictaed, before async to protect this route
router.get('/profile/:id', function (req, res, cb) {
    const user = db.User.findOne({
        where: {
            id: req.params.id,
        }
    })
    res.render('profile', { user: user.dataValues});
});

router.get('/profile/', isAuthenticated, function (req, res) {
    res.redirect('/profile/' + req.user.id)
});

module.exports = router;
