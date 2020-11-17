"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};

if (fs.existsSync(__dirname + "/../config/config.json")) {
  const config = require(__dirname + "/../config/config.json")[env];
  if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    var sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
} else if (process.env.JAWSDB_URL) {
  var sequelize = new Sequelize(process.env.JAWSDB_URL);
}

getModels(__dirname);

getModels(__dirname + "/connections");

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

function getModels(dirPath) {
  fs.readdirSync(dirPath)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach(file => {
      const model = require(path.join(dirPath, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });
}

