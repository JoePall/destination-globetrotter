const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("./config/passport");
const PORT = process.env.PORT || 8080;
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "Espresso in Tahiti Mornings! Fresh Seafood in Hawaii evenings!",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync({ force: true }).then((seq) => {
  // Setting up route controllers for db.
  app.use(require("./controllers")(seq.models));

  app.listen(PORT, function () {
    seed();
    console.log("http://localhost:" + PORT);
  });
});

const seed = () => {
  db.user.create({
    email: "johndoe@web.site",
    firstName: "John",
    lastName: "Doe",
    password: "Hello",
  });
  db.group.create({
    name: "KU Coding Bootcamp Class of '20"
  });
  db.group.create({
    name: "Smith Family"
  });
  let date = Date.now();
  db.group.create({
    name: "BFF's"
  });
  db.trip.create({
    name: "Friends Cruise?",
    start: date + 6,
    end: date + 12
  })
  db.user_group.create({
    userId: 1,
    groupId: 1,
  });
  db.user_group.create({
    userId: 1,
    groupId: 3,
  });
};
