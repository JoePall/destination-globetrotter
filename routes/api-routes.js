const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const express = require("express");
const router = express.Router();

// // Create User
// router.post("/api/signUp", isAuthenticated, function (req, res, cb) {
//   let user = db.User.findOrCreate({
//     where: { email: req.body.email },
//     defaults: req.body,
//   });

//   cb();

//   if (Array.isArray(user)) user = user[0];
//   req.login(user, function (err) {
//     if (!err) {
//       res.json(user.dataValues.id);
//       if (req.user) {
//         res.redirect("/");
//       } else {
//         res.redirect("/login");
//       }
//     }
//   });
// });

// // Log the User in with passport -- creates req.user
// router.post("/api/login", function (
//   req,
//   res
// ) {
//   console.log("Hello from your server!");
//   const dbUser = db.User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });
//   res.json(dbUser.id);
//   if (req.user) {
//     res.redirect("/");
//   } else {
//     res.redirect("/login");
//   }
// });

router.post("/api/signup", (req, res) => {
  console.log("Hello World");
  console.log(req.body);
  db.User.create(req.body)
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Log the user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
