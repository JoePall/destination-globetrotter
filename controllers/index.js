const db = require("../controllers");
const path = require("path");
const router = require("express").Router();



  // const setupGet = (basePath, model) => {
  //   const path = basePath;
  //   console.log("Constructing GET: " + basePath);
  //   app.get(path, (req, res) => {
  //     console.log(path);
  //     db[model].findAll().then(data => {
  //       res.json(data);
  //     });
  //   });
    
  //   return { "get": path };
  // } 

  // const setupGetOne = (basePath, model) => {
  //   const path = basePath + ":id";
  //   console.log("Constructing GET: " + path);
  //   app.get(path, (req, res) => {
  //     console.log(path);
  //     db[model].findAll({ where: { id: req.params.id } }).then(data => {
  //       res.json(data);
  //     });
  //   });
    
  //   return { "getOne": path };
  // } 

  // const setupCreate = (basePath, model) => {
  //   const path = basePath;
  //   console.log("Constructing PUT: " + path);
  //   app.put(path, (req, res) => {
  //     console.log(path);
  //     db[model].create(req.body).then(data => {
  //       res.json(data);
  //     });
  //   });
    
  //   return { "create": path };
  // }

  // const setupUpdate = (basePath, model) => {
  //   const path = basePath + ":id";
  //   console.log("Constructing PUT: " + path);

  //   return { "update": path };
  // } 
    
  // const setupDelete = (basePath, model) => {
  //   const path = basePath + ":id";
  //   console.log("Constructing GET: " + path);
  //   app.delete(path, (req, res) => {
  //     db[model].destroy({ where: { id: req.params.id } });
  //   });
    
  //   return { "delete": path };
  // }

  // let routes = [];
  
  // Object.keys(db).filter(x => x.toLowerCase == "sequelize").forEach(model => {
  //   const basePath = "/api/" + model + "/"; 
  //   console.log(basePath);
  //   routes.push(setupGet(basePath, model));
  //   routes.push(setupCreate(basePath, model));
  //   routes.push(setupUpdate(basePath, model));
  //   routes.push(setupGetOne(basePath, model));
  //   routes.push(setupDelete(basePath, model));
  // });
  
  // let API = {};

  // routes.forEach(route => {
  //   Object.keys(route).forEach(key => {
  //     // API.prototype[key] = routes[key];
  //   });
  // });
  
  // app.get("/api/", (req, res) => {
  //   res.json(API);
  // });





module.exports = router;