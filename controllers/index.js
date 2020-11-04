"use strict";

const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

module.exports = function (app) {
  getControllers("create", app);
  getControllers("read", app);
  getControllers("update", app);
  getControllers("delete", app);
    
  module.exports = app;
};

function getControllers(subDirectory, app) {
  fs.readdirSync(__dirname + "/subDirectory")
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      require("./" + file)(app);
    });
}

