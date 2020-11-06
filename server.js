var express = require("express");
var session = require("express-session");
const favicon = require('express-favicon');


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

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    seed();
    console.log("http://localhost:" + PORT);
  });
});

const seed = () => {
  // db.User.create();
}