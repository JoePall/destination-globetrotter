const express = require("express");
const app = express();
const moment = require("moment");
const session = require("express-session");
const passport = require("./config/passport");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "Espresso in Tahiti Mornings! Fresh Seafood in Hawaii evenings!",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

db.sequelize.sync({ force: true }).then((seq) => {
  // Setting up route controllers for db.
  app.use(require("./controllers")(seq.models));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });

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
  db.user.create({
    email: "mmink@michaelamink.com",
    firstName: "Michael",
    lastName: "Mink",
    password: "mminkmmink",
  });
  db.user.create({
    email: "example@email.com",
    firstName: "Andrew",
    lastName: "Popp",
    password: "password",
  });
  db.user.create({
    email: "julieschaub@hotmail.com",
    firstName: "Julie",
    lastName: "Schaub",
    password: "Libby",
  });
  db.pending.create({
    requestedId: 1,
    requesterId: 2,
    tripId: 2,
  });

  db.pending.create({
    requestedId: 2,
    requesterId: 1,
    tripId: 2,
  });
  db.group.create({
    name: "KU Coding Bootcamp Class of '20",
  });
  db.trip_user.create({
    userId: 1,
    tripId: 1,
  });
  db.group.create({
    name: "Smith Family",
  });
  let date = Date.now();
  db.trip.create({
    location: "Los Angeles",
    userId: 1,
  });
  db.trip.create({
    location: "Los Angeles",
    start: moment(date).add(7, "days").format("M/D/Y"),
    end: moment(date).add(15, "days").format("M/D/Y"),
    userId: 1,
  });
  db.user_group.create({
    userId: 1,
    groupId: 1,
  });
  db.user_group.create({
    userId: 1,
    groupId: 3,
  });
  db.trip_user.create({
    tripId: 1,
    userId: 1,
  });
  db.user.create({
    email: "josiahpowell@outlook.com",
    firstName: "Josiah",
    lastName: "Powell",
    password: "#passedIT",
  });
  db.message.create({
    userId: 1,
    tripId: 1,
    text:
      "Fly into Hawaii and jump on a cruise? ... we can see every island that way and unload our bags once as opposed to multiple hotels on different islands and extra travel time which can be accomplished during the night.",
  });
  db.message.create({
    userId: 2,
    tripId: 1,
    text: "That sounds good!",
  });
};
