const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = require("express").Router();
const db = require("../models");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

// Sets up routes for getting all records for a model.
const setupGet = (basePath, model) => {
  const path = basePath;

  router.get(path, (req, res) => {
    console.log(req.user.id);
    if (model === "user") {
      db[model].findAll().then((data) => {
        res.json(data);
      });
    } else {
      db[model].findAll({ where: { userId: req.user.id } }).then((data) => {
        res.json(data);
      });
    }
  });

  return { operation: "get", path: path, type: "get" };
};

// Sets up routes for getting a record by id for a model.
const setupGetOne = (basePath, model) => {
  const path = basePath + ":id";

  router.get(path, isAuthenticated, (req, res) => {
    db[model].findOne({ where: { id: req.params.id } }).then((data) => {
      res.json(data);
    });
  });

  return { operation: "getOne", path: path, type: "get", params: ["id"] };
};

// Sets up routes for creating a model record.
const setupCreate = (basePath, model) => {
  const path = basePath;

  router.post(path, isAuthenticated, (req, res) => {
    let result = req.body;
    result.userId = req.user.id;
    db[model].create(result).then((data) => {
      res.json(data);
    });
  });

  return { operation: "create", path: path, type: "post", object: ["o"] };
};

// Sets up routes for updating a record for a model. Ignores fields that are not passed in by key.
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

// Sets up routes for deleting a records by id.
const setupDelete = (basePath, model) => {
  const path = basePath + ":id";

  router.delete(path, (req, res) => {
    db[model].destroy({ where: { id: req.params.id } });
  });

  return { operation: "delete", path: path, type: "delete", params: ["id"] };
};

// Sets up routes for junction tables; returns a one to many in either direction by id.
function setupGetAssociation(modelA, modelB, model) {
  const path = "/api/" + modelB + "sby" + modelA + "/:id";

  router.get(path, isAuthenticated, (req, res) => {
    try {
      const filter = { where: {} };
      filter.where[modelA + "Id"] = req.params.id;
      db[model].findAll(filter).then((children) => {
        let ids = children.map((child) => child.dataValues[modelB + "Id"]);
  
        db[modelB].findAll({ where: { id: [...ids] } }).then((item) => {
          res.send(item);
        });
      });
    } catch (error) {
      res.status(500).send(error)
    }
  });

  return { operation: "get", path: path, type: "get", params: ["id"] };
}

// Internal for creating an api object for calling on the front end.
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

function addConnectionToAPIObject(
  routes,
  model,
  { operation, path, type, params, object }
) {
  let name = model.toLowerCase();
  if (!routes[name]) routes[name] = [];
  let result = '(o) => axios.create("' + path + '"';
  if (params) result += ", " + params.join(", ");
  if (object) result += ", " + object.join(", ");
  result += ")";
  routes[name].push(result);

  return routes;
}

// init for setting up routes pertaining to the db.
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
        routes = addToAPIObject(routes, model, setupCreate(basePath, model));
        routes = addToAPIObject(routes, model, setupDelete(basePath, model));
      } else {
        routes = addToAPIObject(routes, model, setupGet(basePath, model));
        routes = addToAPIObject(routes, model, setupCreate(basePath, model));
        routes = addToAPIObject(routes, model, setupGetOne(basePath, model));
        routes = addToAPIObject(routes, model, setupUpdate(basePath, model));
        routes = addToAPIObject(routes, model, setupDelete(basePath, model));
      }
    }
  });

  router.get("/api/", isAuthenticated, (req, res) => {
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
