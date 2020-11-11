const path = require("path");
const router = require("express").Router();
const db = require("../models");

const setupGet = (basePath, model) => {
  const path = basePath;
  router
    .route(path)
    .get((req, res) => {
    db[model].findAll().then(data => {
      res.json(data);
    });
  });

  return [ "get", path, "get", "" ];
}
  
const setupGetOne = (basePath, model) => {
  const path = basePath + ":id";
  router.route(path).get((req, res) => {
    db[model].findAll({ where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  });
  
  return [ "getOne", path, "get", "id" ];
} 

const setupCreate = (basePath, model) => {
  const path = basePath;
  router.route(path).post((req, res) => {
    db[model].create(req.body).then(data => {
      res.json(data);
    });
  });
  
  return [ "create", path, "post", "o" ];
}

const setupUpdate = (basePath, model) => {
  const path = basePath + ":id";

  return [ "update", path, "put" ];
} 
  
const setupDelete = (basePath, model) => {
  const path = basePath + ":id";
  router.route(path).delete((req, res) => {
    db[model].destroy({ where: { id: req.params.id } });
  });
  
  return [ "delete", path, "delete", "id" ];
}

const setupAPIRoutes = (routes) => {
  let API = { api: routes };
  
  router.route("/api/").get((req, res) => {
    res.json(API);
  });
}

module.exports = (models) => {
  let routes = {};
  
  Object.keys(models).forEach(model => {
    if (model) {
      const basePath = "/api/" + model.toLowerCase() + "/"; 

      routes = addToAPIObject(routes, model, setupGet(basePath, model));
      routes = addToAPIObject(routes, model, setupCreate(basePath, model));
      routes = addToAPIObject(routes, model, setupGetOne(basePath, model));
      routes = addToAPIObject(routes, model, setupUpdate(basePath, model));
      routes = addToAPIObject(routes, model, setupDelete(basePath, model));
    }
  });

  setupAPIRoutes(routes);
  
  return router;
}

function addToAPIObject(routes, model, o) {
  if (!routes[model]) routes[model] = {};
  routes[model][o[0]] = "(" + o[3] + ") => axios." + o[2] + "(" + o[1] + ")";

  return routes;
}
