const db = require("../models");
const isAuthenticated = require("../config/middleware");

module.exports = function (app) {
  Object.keys(db).forEach(modelName => {
    const path = "/api/" + modelName; 
    console.log(path);
    app.get(path, isAuthenticated, (req, res) => {
      db[modelName].findAll().then(data => {
        res.json(data);
      });
    });
  });

  module.exports = app;
};
