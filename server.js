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

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
  db.user.create({
    email: "mmink@michaelamink.com",
    firstName: "Michael",
    lastName: "Mink",
    password: "mminkmmink",
  });
  db.group.create({
    name: "KU Coding Bootcamp Class of '20"
  });
  db.trip_user.create({
    userId: 1,
    tripId: 1
  });
  db.trip_user.create({
    userId: 2,
    tripId: 1
  });
  db.trip_user.create({
    userId: 1,
    tripId: 2
  });
  db.trip_user.create({
    userId: 3,
    tripId: 1
  });
  db.trip_user.create({
    userId: 1,
    tripId: 3
  });
  db.group.create({
    name: "Smith Family"
  });
  let date = Date.now();
  db.trip.create({
    location: "Hawaii"
  });
  db.trip.create({
    location: " Cruise?",
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
  db.bookmark.create({
    data: JSON.parse('{"id":"08dd243e489f000083c10e41_0|08dd243e489f000083c10e41_1|243e071348a600000d3a6eee_0|071308dd48a600003f70cfe1_0","nightsInDest":7,"duration":{"departure":27720,"return":21600,"total":49320},"flyFrom":"MCI","cityFrom":"Kansas City","cityCodeFrom":"MKC","countryFrom":{"code":"US","name":"United States"},"flyTo":"LAX","cityTo":"Los Angeles","cityCodeTo":"LAX","countryTo":{"code":"US","name":"United States"},"distance":2192.06,"routes":[["MCI","LAX"],["LAX","MCI"]],"airlines":["WN","UA","NK"],"pnr_count":3,"has_airport_change":false,"technical_stops":0,"price":205,"bags_price":{"1":125.64,"2":282.01},"baglimit":{"hold_width":28,"hold_height":52,"hold_length":78,"hold_dimensions_sum":158,"hold_weight":18},"availability":{"seats":4},"facilitated_booking_available":true,"conversion":{"USD":205,"EUR":173},"quality":306.599666,"booking_token":"BTvczruP-Ph-s6sw689UXGIJMssetBdtITb-oosVAIYYCe1Gect7kJvTDI81-w-Nn1Fxn6O6YcuXHEgniYPd80xhrNXb32LanLZpb7clMX7UDHi-L7bwAI-Y3UMVdnA0TEvk_wvvQc4iZIOrhDyQV72l7adVsMM2qKCkiT77AtvSz_vnmleTZPk1diZVQUw0yESDLDVVMMny6a-rumzZOrCC_NMOJlMHGS_5lldwvHaC0d7HdMrzCNky4xru98Wb9xQQisGItwH2N9yZRgU1kE_bkBl2tVoqSNEBYDCtGwWWYcJe6XNfvj7gc6dbQessF61idS_yasFGXwxOQ9dFK4C7qk8zEe_K0aYqXOogA67Dma0OQsh20Oe5-LyWJYViWSdsAtsx95O9sYxzbg7nvrlZ_MSPSfgK1CXFXiaRcUoBJSuJjZKO-Hn0S3uVp-RyuBLnvgJo62SA76NA_meXpR_WfL-HTlCh3HQjvR27_7FiUOx7hWiy7M9f8RcqTIm1xGpKWNrpHekx4SjTzsDfZcp4NqmYgFK2VWJ6qZrmTB7yVc9TxIuzRYshrWb88jXf3a7dwl8ZPO_hZ1IkZoIJ1-1TDD4UplCALUuAh1wrrppWyouzb0_3bxIQDuJQne4n73aEnUYDfupAV9MdaUX53rXNYD_b5Lg1CncCJf7zNDfM3RYsMkrn1w1JCgyDVEzVnS-gVuG4Whga6gh6v-yWkRw==","transfers":[],"type_flights":["deprecated"],"fare":{"adults":205,"children":205,"infants":205},"price_dropdown":{"base_fare":205,"fees":0},"virtual_interlining":true,"route":[{"fare_basis":"GA3NR","fare_category":"M","fare_classes":"G","fare_family":"","last_seen":"2020-11-18T21:35:22.000Z","refresh_timestamp":"2020-11-18T21:35:22.000Z","return":0,"bags_recheck_required":false,"guarantee":false,"id":"08dd243e489f000083c10e41_0","combination_id":"08dd243e489f000083c10e41","cityTo":"Las Vegas","cityFrom":"Kansas City","cityCodeFrom":"MKC","cityCodeTo":"LAS","flyTo":"LAS","flyFrom":"MCI","airline":"NK","operating_carrier":"","equipment":null,"flight_no":719,"vehicle_type":"aircraft","operating_flight_no":"","local_arrival":"2020-11-25T17:25:00.000Z","utc_arrival":"2020-11-26T01:25:00.000Z","local_departure":"2020-11-25T16:26:00.000Z","utc_departure":"2020-11-25T22:26:00.000Z"},{"fare_basis":"GA3NR","fare_category":"M","fare_classes":"G","fare_family":"","last_seen":"2020-11-18T21:35:22.000Z","refresh_timestamp":"2020-11-18T21:35:22.000Z","return":0,"bags_recheck_required":false,"guarantee":false,"id":"08dd243e489f000083c10e41_1","combination_id":"08dd243e489f000083c10e41","cityTo":"Los Angeles","cityFrom":"Las Vegas","cityCodeFrom":"LAS","cityCodeTo":"LAX","flyTo":"LAX","flyFrom":"LAS","airline":"NK","operating_carrier":"","equipment":null,"flight_no":1719,"vehicle_type":"aircraft","operating_flight_no":"","local_arrival":"2020-11-25T22:08:00.000Z","utc_arrival":"2020-11-26T06:08:00.000Z","local_departure":"2020-11-25T20:59:00.000Z","utc_departure":"2020-11-26T04:59:00.000Z"},{"fare_basis":"","fare_category":"M","fare_classes":"N","fare_family":"","last_seen":"2020-11-18T20:42:30.000Z","refresh_timestamp":"2020-11-18T20:42:30.000Z","return":1,"bags_recheck_required":false,"guarantee":false,"id":"243e071348a600000d3a6eee_0","combination_id":"243e071348a600000d3a6eee","cityTo":"Denver","cityFrom":"Los Angeles","cityCodeFrom":"LAX","cityCodeTo":"DEN","flyTo":"DEN","flyFrom":"LAX","airline":"UA","operating_carrier":"UA","equipment":null,"flight_no":1036,"vehicle_type":"aircraft","operating_flight_no":"1036","local_arrival":"2020-12-02T16:29:00.000Z","utc_arrival":"2020-12-02T23:29:00.000Z","local_departure":"2020-12-02T13:15:00.000Z","utc_departure":"2020-12-02T21:15:00.000Z"},{"fare_basis":"","fare_category":"M","fare_classes":"V","fare_family":"","last_seen":"2020-11-18T21:18:57.000Z","refresh_timestamp":"2020-11-18T21:18:57.000Z","return":1,"bags_recheck_required":true,"guarantee":true,"id":"071308dd48a600003f70cfe1_0","combination_id":"071308dd48a600003f70cfe1","cityTo":"Kansas City","cityFrom":"Denver","cityCodeFrom":"DEN","cityCodeTo":"MKC","flyTo":"MCI","flyFrom":"DEN","airline":"WN","operating_carrier":"WN","equipment":null,"flight_no":1059,"vehicle_type":"aircraft","operating_flight_no":"1059","local_arrival":"2020-12-02T21:15:00.000Z","utc_arrival":"2020-12-03T03:15:00.000Z","local_departure":"2020-12-02T18:40:00.000Z","utc_departure":"2020-12-03T01:40:00.000Z"}],"local_arrival":"2020-11-25T22:08:00.000Z","utc_arrival":"2020-11-26T06:08:00.000Z","local_departure":"2020-11-25T16:26:00.000Z","utc_departure":"2020-11-25T22:26:00.000Z"}'),
    userId: 1
  });
  db.trip_user.create({
    tripId: 1,
    userId: 1,
  });
  db.trip_bookmark.create({
    bookmarkId: 1,
    tripId: 1,
  });
};
