const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(router) {
  router.get("/api/usersInGroup", isAuthenticated, (req, res) => {
    db.user_group.findAll({ where: { id: req.user.id } })
      .then(data => {
        res.json(data);
      });
  });
}