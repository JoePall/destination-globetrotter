const path = require("path");
const router = require("express").Router();
const db = require("../models");

const setupGet = (basePath, model) => {
  const path = basePath;
  router
    .get(path, (req, res) => {
    db[model].findAll().then(data => {
      res.json(data);
    });
  });

  return { operation: "get", path: path, type: "get" };
}
  
const setupGetOne = (basePath, model) => {
  const path = basePath + ":id";
  router.get(path, (req, res) => {
    db[model].findAll({ where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  });
  
  return { operation: "getOne", path: path, type: "get", params: ["id"] };
} 

const setupCreate = (basePath, model) => {
  const path = basePath;
  router.post(path, (req, res) => {
    // console.log("req from setupCreate = ", req)
    db[model].create(req.body).then(data => {
      console.log("req.body from setupCreate = ", req.body)
      res.json(data);
    });
  });
  
  return { operation: "create", path: path, type: "post", object: ["o"] };
}

const setupUpdate = (basePath, model) => {
  const path = basePath + ":id";

  router.put(path, (req, res) => {
    db[model].update(req.body, { where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  });

  return { operation: "update", path: path, type: "put", params: ["id"], object: ["o"] };
} 

const setupDelete = (basePath, model) => {
  const path = basePath + ":id";
  router.route(path).delete((req, res) => {
    db[model].destroy({ where: { id: req.params.id } });
  });
  
  return { method: "delete", path: path, type: "delete", params: ["id"] };
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
  
  router.get("/api/", (req, res) => {
    res.json({ api: routes });
  });
  
  setupCustomRoutes();
  
  return router;
}

function addToAPIObject(routes, model, { operation, path, type, params, object }) {
  let name = model.toLowerCase(); 
  if (!routes[name]) routes[name] = [];
  let result = operation + ": (";
  if (params) result += params.join(", ");
  if (params && object) result += ", ";
  if (object) result += object.join(", ");
  result += ") => axios." + type + "(\"" + path + "\"";
  if (params) result += ", " + params.join(", ");
  if (object) result += ", " + object.join(", ");
  result += ")";
  routes[name].push(result)

  return routes;
}

function setupCustomRoutes() {
  router.get("/api/authenticated/", (req, res) => {
    if (req.user) res.send(true);
    else res.send(false);
  });

  router.post("/api/login", (req, res) => {
    console.log("Hello from /api/login");
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });
}