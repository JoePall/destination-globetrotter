const db = require("../models");
const isAuthenticated = require("../config/middleware");

module.exports = function (app) {
  const setupGet = (basePath, model) => {
    console.log("Constructing GET: " + basePath);
    app.get(basePath, isAuthenticated, (req, res) => {
      db[model].findAll().then(data => {
        res.json(data);
      });
    });

    return { "get": basePath };
  } 
  
  const setupGetOne = (basePath, model) => {
    const path = basePath + ":id";
    console.log("Constructing GET: " + path);
    app.get(path, isAuthenticated, (req, res) => {
      db[model].findAll({ where: { id: req.params.id } }).then(data => {
        res.json(data);
      });
    });

    return { "getOne": path };
  } 
  
  const setupCreate = (basePath, model) => {
    const path = basePath;
    console.log("Constructing PUT: " + path);
    app.put(path, isAuthenticated, (req, res) => {
      db[model].create(req.body).then(data => {
        res.json(data);
      });
    });

    return { "create": basePath };
  } 
  
  const setupUpdate = (basePath, model) => {
    const path = basePath + ":id";
    console.log("Constructing PUT: " + path);
    app.put(path, isAuthenticated, (req, res) => {
      let result = db.findOne({ id: req.params.id });

      Object.keys(req.body).forEach(key => {
        result[key] = req.body[key];
      });

      db[model].update(result,
        { where: { id: req.params.id } }).then(data => {
        res.json(data);
      });
    });

    return { "update": path };
  } 
  
  const setupDelete = (basePath, model) => {
    const path = basePath + ":id";
    console.log("Constructing GET: " + path);
    app.delete(path, isAuthenticated, (req, res) => {
      db[model].destroy({ where: { id: req.params.id } });
    });
    
    return { "delete": path };
  }
  
  const setupAPI = (routes) => {
    let API = {};

    routes.forEach(route => {
      Object.keys(route).forEach(key => {
        API.prototype[key] = routes[key];
      });
    });

    app.get("/api/", (req, res) => {
      res.json(API);
    });
  }

  let routes = [];

  Object.keys(db).filter(x => x.toLowerCase == "sequelize").forEach(model => {
    const basePath = "/api/" + model + "/"; 
    
    routes.push(setupGet(basePath, model));
    routes.push(setupCreate(basePath, model));
    routes.push(setupUpdate(basePath, model));
    routes.push(setupGetOne(basePath, model));
    routes.push(setupDelete(basePath, model));
  });

  setupAPI(routes);

  module.exports = app;
};

