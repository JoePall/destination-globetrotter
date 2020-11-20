const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (router) {
  //TODO: Finish this...
  router.post("/api/createfromflight", isAuthenticated, (req, res) => {
    if (!req.user) return res.status(500).send("No user found");

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
          if (!trip_user.length > 0)
            return res.status(500).json(
              "User is not authorized ... Request invite from the trip owner"
            );

          db.message
            .findAll({ where: { tripId: req.params.id } })
            .then((messages) => {
              let messageIds = messages.map((message) => message.id);
              db.user.findAll({ where: { id: messageIds } }).then((users) => {
                let result = messages.map((message) => {
                  if (!message) {
                    console.log("Hello");
                    return;
                  }
                  console.log(message);
                  console.log(users);
                  let item = {};
                  console.log(users);
                  let user = users.find((u) => {
                    console.log(u);
                    return u.id === message.dataValues.userId;
                  });
                  console.log(user);
                  item.id = message.dataValues.id;
                  item.name =
                    user.dataValues.firstName + " " + user.dataValues.lastName;
                  item.email = user.dataValues.email;
                  item.text = message.dataValues.text;
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

  router.get("/api/pendingtrips/:id", isAuthenticated, (req, res) => {
    try {
      db.pending
        .findAll({ where: { requestedId: req.user.id } })
        .then((pending) => {
          let ownerIds = pending.map(p => p.requesterId);
          let tripIds = pending.map(p => p.tripId);
          
          db.user.findAll({ where: { id: ownerIds } }).then(owner => {
            db.trip.findAll({ where: { id: tripIds } }).then(trip => {
              let result = pending.map(item => {
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
