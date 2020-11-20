const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (router) {
  //TODO: Finish this...
  router.post("/api/createfromflight", isAuthenticated, (req, res) => {
    console.log("HELLOOOOOOOOOO");
    if (!req.user) return res.send("No user found");

    db.bookmark
      .create({ ...req.body.bookmark, userId: req.user.id })
      .then((bookmark) => {
        db.trip
          .create({ ...req.body.trip, userId: req.user.id })
          .then((trip) => {
            db.trip_bookmark
              .create({
                tripId: trip.dataValues.id,
                bookmarkId: bookmark.dataValues.id,
              })
              .then(() => {
                db.trip_user
                  .create({
                    userId: req.user.id,
                    tripId: trip.dataValues.id,
                  })
                  .then(() => {
                    res.json({ tripId: trip.dataValues.id });
                  });
              });
          });
      });
  });

  router.get("/api/user/", isAuthenticated, (req, res) => {
    db.user.findAll().then((data) => {
      res.json(data);
    });
  });

  router.get("/api/messagesfromtrip/:id", isAuthenticated, (req, res) => {
    try {
      let promises = [];

      db.trip_user
        .findOne({ where: { userId: req.user.id, tripId: req.params.id } })
        .then((hasOne) => {
          console.log(hasOne);

          db.message
            .findAll({ where: { tripId: req.params.id } })
            .then((messages) => {
              messages.map((message) => {
                promises.push(
                  db.user
                    .findOne({ where: { id: message.dataValues.userId } })
                    .then((user) => {
                      let result = {};
                      result.id = message.id;
                      result.name =
                        user.dataValues.firstName +
                        " " +
                        user.dataValues.lastName;
                      result.email = user.dataValues.email;
                      result.text = message.text;
                      console.log(result);
                      return result;
                    })
                );
              });
            });
        });

      Promise.all(promises).then();
      
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
