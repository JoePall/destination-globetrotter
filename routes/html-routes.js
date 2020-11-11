const express = require("express");
const db = require("../models");
const router = express.Router();
const passport = require("../config/passport");

const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/signup", function (req, res) {
  console.log("Hello");
  res.redirect("signUp");
});

router.get("/search-flights", isAuthenticated, function (req, res) {
  console.log(req.user);
  if (req.user) {
  }
  else {
    res.redirect("login");
  }
});

router.get("/login", function (req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.redirect("login");
  }
});

// add isAuthentictaed, before async to protect this route
router.get("/profile/:id", function (req, res, cb) {
  const user = db.User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render("profile", { user: user.dataValues });
});

router.get("/profile/", isAuthenticated, function (req, res) {
  res.redirect("/profile/" + req.user.id);
});

router.route("/api/login").post(passport.authenticate("local"), (req, res) => {
  res.json({
    email: req.user.email,
    id: req.user.id,
  });
});

router.route("/api/signup").post((req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
