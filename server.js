var express = require("express");
var app = express();

var session = require("express-session");
const favicon = require('express-favicon');
const routes = require("./controllers"); 
app.use(routes);
var passport = require("./config/passport");
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

require("./controllers")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    seed();
    console.log("http://localhost:" + PORT);
  });
});

const seed = () => {
  // db.User.create();
}