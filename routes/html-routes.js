const express = require('express');
const db = require('../models');
const router = express.Router();
// const path = require('path');

// Middleware to see if user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/search-flights', function (req, res) {
    res.render('search-flights');
});

router.get('/login', function (req, res) {
    res.render('login');
});

// add isAuthentictaed, before async to protect this route
router.get('/profile/:id', async function (req, res, cb) {
    const user = await db.User.findOne({
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
