const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (router) {
  //TODO: Finish this...
  router.post("/api/createfromflight", isAuthenticated, (req, res) => {
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
      db.trip_user
        .findAll({ where: { userId: req.user.id, tripId: req.params.id } })
        .then((trip_user) => {
          db.message
            .findAll({ where: { tripId: req.params.id } })
            .then((messages) => {
              let messageOwnerIds = messages.map(
                (message) => message.dataValues.userId
              );
              db.user
                .findAll({ where: { id: messageOwnerIds } })
                .then((users) => {
                  let result = messages.map((message) => {
                    let item = {};

                    item.message = message.dataValues;
                    item.owner = users.find(
                      (user) => user.dataValues.id === message.dataValues.userId
                    ).dataValues;

                    return item;
                  });

                  res.json(result);
                });
            });
        });
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/api/eventsfromtrip/:id", isAuthenticated, (req, res) => {
    try {
      db.trip_user
        .findAll({ where: { userId: req.user.id, tripId: req.params.id } })
        .then((trip_user) => {
          if (trip_user.length > 0) {
            db.event
              .findAll({ where: { tripId: req.params.id } })
              .then((events) => {
                db.trip.findByPk(req.params.id).then((trip) => {
                  let result = {};

                  console.log(events);
                  result.events = events;
                  result.trip = trip;
                  console.log(result);

                  res.json(result);
                });
              });
          }
          else {
            res.status(401).send("Unauthorized access to trip data.");
          }
        });
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/api/pendingtrips/:id", isAuthenticated, (req, res) => {
    try {
      db.pending
        .findAll({ where: { requestedId: req.user.id } })
        .then((pending) => {
          let ownerIds = pending.map((p) => p.requesterId);
          let tripIds = pending.map((p) => p.tripId);

          db.user.findAll({ where: { id: ownerIds } }).then((owner) => {
            db.trip.findAll({ where: { id: tripIds } }).then((trip) => {
              let result = pending.map((item) => {
                let x = {};
                x.pending = item;
                x.owner = owner[0];
                x.trip = trip[0];
                return x;
              });

              res.json(result);
            });
          });
        });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
