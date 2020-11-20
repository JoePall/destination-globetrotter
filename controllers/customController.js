const db = require("../models");

module.exports = function (router) {
  //TODO: Finish this...
  router.post("/api/createfromflight", (req, res) => {
    if (!req.user) return res.send("No user found");

    let promises = [];
    let tripId = 0;

    promises.push(
      db.bookmark.create({ data: result }).then((bookmark) => {
        promises.push(
          db.trip
            .create({ location: result.cityTo, userId: req.user.id })
            .then((trip) => {
              promises.push(
                db.trip_bookmark.create({
                  tripId: trip.data.id,
                  bookmarkId: bookmark.data.id,
                })
              );
              promises.push(
                db.trip_user.create({
                  userId: req.user.id,
                  tripId: trip.data.id,
                })
              );
              tripId = trip.data.id;
            })
        );
      })
    );

    Promise.all(promises).then(() => {
      res.json({ tripID: tripId });
    });
  });

  router.get("/api/user/", (req, res) => {
    db.user.findAll().then(data => {
      res.json(data);
    });
  });

  router.get("/api/messagesfromtrip/:id", (req, res) => {
    try {
      
      db.trip_message.findAll({ where: { tripId: req.params.id } }).then((children) => {
        let childIds = children.map((child) => {
          return child.dataValues.id;
        });
        console.log(childIds);
        
        db.message.findAll({ where: { id: [...childIds] } }).then((messages) => {
          let promises = [];

          messages.map((message) => {
            console.log(message.dataValues.userId);
            promises.push(db.user.findOne({ where: { id: message.dataValues.userId } }).then((user) => {
              let result = {};
              result.id = message.id;
              result.name = user.dataValues.firstName + " " + user.dataValues.lastName;
              result.email = user.dataValues.email;
              result.text = message.text;
              return result;
            }));
          });

          Promise.all(promises).then(data => {
            console.log("YOU PROMISED" + data);
            res.json(data);
          })
        });
      });

      
    } catch (error) {
      res.status(401).json(error);
    }
  });
};
