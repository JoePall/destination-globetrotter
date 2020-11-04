const db = require("../models");
const isAuthenticated = require("../config/middleware");

module.exports = function (app) {
  Object.keys(db).forEach(modelName => {
    const basePath = "/api/" + modelName + "/"; 
    setupGet(basePath);
    setupGetOne(basePath);
    setupDelete(basePath);
  });

  module.exports = app;
};

const setupGet = (basePath) => {
  console.log("Constructing GET: " + basePath);
  app.get(basePath, isAuthenticated, (req, res) => {
    db[modelName].findAll().then(data => {
      res.json(data);
    });
  });
} 

const setupGetOne = (basePath) => {
  const path = basePath + ":id";
  console.log("Constructing GET: " + path);
  app.get(path, isAuthenticated, (req, res) => {
    db[modelName].findAll({ where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  });
} 

const setupCreate = (basePath) => {
  const path = basePath;
  console.log("Constructing PUT: " + path);
  app.put(path, isAuthenticated, (req, res) => {
    db[modelName].create(req.body).then(data => {
      res.json(data);
    });
  });
} 

const setupUpdate = (basePath) => {
  const path = basePath + ":id";
  console.log("Constructing PUT: " + path);
  app.put(path, isAuthenticated, (req, res) => {
    //TODO: sequelize update...
    // db[modelName].(req.body).then(data => {
    //   res.json(data);
    // });
  });
} 

const setupDelete = (basePath) => {
  const path = basePath + ":id";
  console.log("Constructing GET: " + path);
  app.delete(path, isAuthenticated, (req, res) => {
    db[modelName].delete({ where: { id: req.params.id } });
  });
}