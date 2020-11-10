const express = require("express");

const favicon = require('express-favicon');
 
const app = express();
 
app.use(favicon(__dirname + '/public/images/logo-small.png'));

const session = require("express-session");
const passport = require("./config/passport");
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/api-routes'));
app.use('/', require('./routes/html-routes'));

db.sequelize.sync({ force: true }).then(seq => {
  try {
    let routes = require("./controllers")(seq.models);
    app.use("/", routes);
    //
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
    }
    else {
      app.use(express.static("client/public"));
      
      const path = require("path")

      app.use(express.static(path.join(__dirname, "client", "public")))
      app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client", "public", "index.html")));

    }
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, function() {
    seed();
    console.log("http://localhost:" + PORT);
  });
});

const seed = () => {
  // db.User.create();
}