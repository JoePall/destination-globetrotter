const express = require("express");
const app = express();

const favicon = require("express-favicon");
const session = require("express-session");
const passport = require("./config/passport");
const PORT = process.env.PORT || 8080;
const db = require("./models");

app.use(favicon(__dirname + "/client/public/images/logo-small.png"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));

db.sequelize.sync({ force: true }).then((seq) => {
  
  // Setting up route controllers for db.
  app.use(require("./controllers")(seq.models));
  
  app.listen(PORT, function () {
    seed();
    console.log("http://localhost:" + PORT);
  });
});

const seed = () => {
  db.User.create({ email: "johndoe@web.site", firstName: "John", lastName: "Doe", password: "Hello" });
};
