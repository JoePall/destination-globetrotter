const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = require("express").Router();
const db = require("../models");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

const setupGet = (basePath, model) => {
  const path = basePath;

  router.get(path, isAuthenticated, (req, res) => {
    console.log(req.user.id);
    db[model].findAll({ where: { userId: req.user.id } }).then((data) => {
      res.json(data);
    });
  });

  return { operation: "get", path: path, type: "get" };
};

const setupGetOne = (basePath, model) => {
  const path = basePath + ":id";

  router.get(path, isAuthenticated, (req, res) => {
    db[model]
      .findAll({ where: { id: req.params.id, userId: req.user.id } })
      .then((data) => {
        res.json(data);
      });
  });

  return { operation: "getOne", path: path, type: "get", params: ["id"] };
};

const setupCreate = (basePath, model) => {
  const path = basePath;

  router.post(path, isAuthenticated, (req, res) => {
    let result = req.body;
    result.userId = req.user.id;
    console.log(result);
    db[model].create(result).then((data) => {
      res.json(data);
    });
  });

  return { operation: "create", path: path, type: "post", object: ["o"] };
};

const setupUpdate = (basePath, model) => {
  const path = basePath + ":id";

  router.put(path, isAuthenticated, (req, res) => {
    db[model]
      .update(req.body, { where: { id: req.params.id } })
      .then((data) => {
        res.json(data);
      });
  });

  return {
    operation: "update",
    path: path,
    type: "put",
    params: ["id"],
    object: ["o"],
  };
};

const setupDelete = (basePath, model) => {
  const path = basePath + ":id";

  router.delete(path, (req, res) => {
    db[model].destroy({ where: { id: req.params.id } });
  });

  return { method: "delete", path: path, type: "delete", params: ["id"] };
};

function setupGetAssociation(modelA, modelB, model) {
  const path = "/api/" + modelA + "sby" + modelB + "/:id";

  router.get(path, isAuthenticated, (req, res) => {
    const joinFilter = {};
    const filter = { where: {}, joinFilter };
    filter.where[modelA + "Id"] = req.params.id;
    db[model].findAll(filter).then((data) => {
      res.json(data);
    });
  });

  return { method: "get", path: path, type: "get", params: ["id"] };
}

function addToAPIObject(
  routes,
  model,
  { operation, path, type, params, object }
) {
  let name = model.toLowerCase();
  if (!routes[name]) routes[name] = [];
  let result = operation + ": (";
  if (params) result += params.join(", ");
  if (params && object) result += ", ";
  if (object) result += object.join(", ");
  result += ") => axios." + type + '("' + path + '"';
  if (params) result += ", " + params.join(", ");
  if (object) result += ", " + object.join(", ");
  result += ")";
  routes[name].push(result);

  return routes;
}

module.exports = (models) => {
  let routes = {};

  Object.keys(models).forEach((model) => {
    if (model) {
      const basePath = "/api/" + model.toLowerCase() + "/";
      const models = model.split("_");

      if (models.length > 1) {
        routes = addToAPIObject(
          routes,
          model,
          setupGetAssociation(models[0], models[1], model)
        );
        routes = addToAPIObject(
          routes,
          model,
          setupGetAssociation(models[1], models[0], model)
        );
      } else {
        routes = addToAPIObject(routes, model, setupGet(basePath, model));
        routes = addToAPIObject(routes, model, setupCreate(basePath, model));
        routes = addToAPIObject(routes, model, setupGetOne(basePath, model));
        routes = addToAPIObject(routes, model, setupUpdate(basePath, model));
        routes = addToAPIObject(routes, model, setupDelete(basePath, model));
      }
    }
  });

  router.get("/api/", (req, res) => {
    res.send("const api = " + JSON.stringify(routes));
  });

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      require("./" + file)(router);
    });

  return router;
};
