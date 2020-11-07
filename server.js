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
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
// =============================================================

app.use('/', require('./routes/api-routes'));
app.use('/', require('./routes/html-routes'));
require("./controllers")(app);

const path = require("path")

app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client", "build", "index.html")));

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    seed();
    console.log("http://localhost:" + PORT);
  });
});

const seed = () => {
  // db.User.create();
}