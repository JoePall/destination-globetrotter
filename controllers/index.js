const path = require("path");
const router = require("express").Router();

const setupGet = (basePath, model) => {
  const path = basePath;
  console.log("Constructing GET: " + basePath);
  router
    .route(path)
    .get((req, res) => {
    console.log(path);
    db[model].findAll().then(data => {
      res.json(data);
    });
  });

  return { "get": path, router: router };
}
  
const setupGetOne = (basePath, model) => {
  const path = basePath + ":id";
  console.log("Constructing GET: " + path);
  router.route(path).get((req, res) => {
    console.log(path);
    db[model].findAll({ where: { id: req.params.id } }).then(data => {
      res.json(data);
    });
  });
  
  return { "getOne": path, router: router };
} 

const setupCreate = (basePath, model) => {
  const path = basePath;
  console.log("Constructing PUT: " + path);
  router.route(path).put((req, res) => {
    console.log(path);
    db[model].create(req.body).then(data => {
      res.json(data);
    });
  });
  
  return { "create": path };
}

const setupUpdate = (basePath, model) => {
  const path = basePath + ":id";
  console.log("Constructing PUT: " + path);

  return { "update": path };
} 
  
const setupDelete = (basePath, model) => {
  const path = basePath + ":id";
  console.log("Constructing DELETE: " + path);
  router.route(path).delete((req, res) => {
    db[model].destroy({ where: { id: req.params.id } });
  });
  
  return { "delete": path };
}

const setupAPIRoutes = (routes) => {
  let API = {};

  routes.forEach(route => {
    Object.keys(route).forEach(key => {
      let criteria = true;
      criteria = criteria && (key);
      criteria = criteria && (routes);
      criteria = criteria && (routes[key]);
      if (criteria) {
        API.prototype[key] = routes[key];
      }
    });
  });
  
  router.route("/api/").get((req, res) => {
    res.json(API);
  });
}

function getRoutes(models) {
  let routes = [];
  
  Object.keys(models).forEach(model => {
    if (model) {
      const basePath = model.toLowerCase() + "/"; 
      routes.push(setupGet(basePath, model));
      routes.push(setupGetOne(basePath, model));
      routes.push(setupCreate(basePath, model));
      routes.push(setupUpdate(basePath, model));
      routes.push(setupDelete(basePath, model));
    }
  });

  setupAPIRoutes(routes);
  
  return router;
}

module.exports = (models) => getRoutes(models);