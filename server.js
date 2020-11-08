var express = require("express");
var app = express();

var session = require("express-session");
const favicon = require('express-favicon');
var passport = require("./config/passport");
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/api-routes'));
app.use('/', require('./routes/html-routes'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

db.sequelize.sync({ force: true }).then(seq => {
  let { getRoutes } = require("./controllers");
  let x = getRoutes((seq.models));
  console.table(x)
  app.use("/api", x);
  setTimeout(() => {
    app.listen(PORT, function() {
      seed();
      console.log("http://localhost:" + PORT);
    });
  }, 1000);
});

const seed = () => {
  // db.User.create();
}