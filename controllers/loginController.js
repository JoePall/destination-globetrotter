const passport = require("../config/passport");
const db = require("../models");

module.exports = function(router) {
  router.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.user.create(req.body)
      .then(() => {
        res.redirect(307, "/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  router.post("/api/login", passport.authenticate("local",), (req, res) => {
    res.json(req.user);
  });

  // Log the user out
  router.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  router.get("/api/authenticated/", (req, res) => {
    if (req.user) res.send(true);
    else res.send(false);
  });
}