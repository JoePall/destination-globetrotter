var express = require("express");
var app = express();

var session = require("express-session");
const favicon = require('express-favicon');
const routes = require("./controllers"); 
app.use(routes);
var passport = require("./config/passport");
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/api-routes'));
app.use('/', require('./routes/html-routes'));

const routes = require("./controllers");
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    seed();
    console.log("http://localhost:" + PORT);
  });
});

const seed = () => {
  // db.User.create();
}