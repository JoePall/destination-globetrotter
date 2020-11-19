const db = require("../models");

module.exports = function(router) {
  //TODO: Finish this...
  router.post("/api/createfromflight", (req, res) => {
    if (!req.user) return res.send("No user found");

    let promises = [];
    let tripId = 0;
    
    promises.push(db.bookmark.create({ data: result }).then(bookmark => {
      promises.push(db.trip.create({ location: result.cityTo, userId: req.user.id }).then(trip => {
        promises.push(db.trip_bookmark.create({ tripId: trip.data.id, bookmarkId: bookmark.data.id }));
        promises.push(db.trip_user.create({ userId: req.user.id, tripId: trip.data.id }));
        tripId = trip.data.id;
      }));
    }));

    Promise.all(promises).then(() => {
      res.json({ tripID: tripId });
    });
  });

  router.get("/api/MyCustomRoute", (req, res) => {
    res.send("Hello World");
  })
}