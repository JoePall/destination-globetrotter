module.exports = function(app) {
  const passport = require("../config/passport");
  const db = require("../models");

  app.get("/api/bookmark", (req, res) => {
    db.Bookmark.findAll({ where: { userid: req.user.id } }).then(data => {
      res.json(data);
    });
  });

  app.get("/api/bookmark/:id", (req, res) => {
    
  });

  app.post("/api/bookmark", (req, res) => {
    
  });
  
  app.delete("/api/bookmark/:id", (req, res) => {
    
  });
};
