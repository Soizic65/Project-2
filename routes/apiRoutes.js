"use strict";

var yelp = require("yelp-fusion");
var apiKey =
  "eGyFYoGa3oYrHwELLpuXsE9A1l9W6d6AoJszCKMPa3M9SNgR2kx1md-nelFS1jJdfOb1sCD3knBmuWA7kDTZSoZMehkn0-Avx1VDY6QMhAX45RpIuKyxSBZ53eTsW3Yx";
var client = yelp.client(apiKey);
var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the users
  app.get("/home", (req, res) => {

    db.User.findAll({}).then(dbusers => {
      res.json(dbusers);
    });
  });
  

  app.get("/api/restaurants", function(req, res) {
    db.Results.findAll({}).then(function(dbRestaurants) {
      res.json(dbRestaurants);
    });
  });

  // Create a new restaurant
  app.post("/api/restaurants", function(req, res) {
    console.log(req.body.text);
    client
      .search({
        location: req.body.text,
        categories: "bars",
        limit: 10
      })
      .then(response => {
        for (var i = 0; i < 10; i++) {
          var tableData = {
            name: response.jsonBody.businesses[i].name,
            address: response.jsonBody.businesses[
              i
            ].location.display_address.join(","),
            URL: response.jsonBody.businesses[i].url
          };
          // console.log(JSON.stringify(response, null, 2));
          db.Results.create(tableData).then(function() {
            res.end();
          });
        }
        // }).catch(e => {
        //   console.log(e);
        // })
      });
  });
  app.delete("/api/examples/", function(req, res) {
    db.Results.destroy({
      where: {},
      truncate: true
    }).then(function() {
      console.log("all rows deleted");
    });
  });
};
// Create a new example
// Retrieving data from users Home
// app.post("/home", (req, res) => {
//   db.User.create({
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone
//   });
//   .then((dbUser) => {
//     res.json(dbUser);
//   });
// });

// Retreiving data hash Home
// app.post("/home", (req, res) => {
//   db.Login.create({
//     email: req.body.email,
//     hash: req.body
//   });
//   .then((dbLogin) => {
//     res.json(dbLogin);
//   });
// });

// // Retrieving data from users Register
// app.post("/register", (req, res) => {
//   db.User.create({
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone
//   })
//   .then((dbUser) => {
//     res.json(dbUser);
//   });
// });

//Retrieving data from hash Register
// app.post("/register", (req, res) => {
//   db.Example.create(req.body)
//   .then((dbExample) => {
//     res.json(dbExample);
//   });
// });

// Delete an example by id

    db.User.findAll({})
    .then((dbUser) => {
      res.json(dbUser);
      });
  });

  // app.get("/home/:id" (req, res) => {
  //   db.User.findAll({})
  //   .then((dbUser) => {
  //     res.json(dbUser)
  //   })
  // })

  // Create a new example
  // Retrieving data from users Home
  // app.post("/home", (req, res) => {
  //   db.User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     phone: req.body.phone
  //   });
  //   .then((dbUser) => {
  //     res.json(dbUser);
  //   });
  // });

  // Retreiving data hash Home
  // app.post("/home", (req, res) => {
  //   db.Login.create({
  //     email: req.body.email,
  //     hash: req.body
  //   });
  //   .then((dbLogin) => {
  //     res.json(dbLogin);
  //   });
  // });

  // Retrieving data from User Register
  app.post("/register", (req, res) => {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    }).then((dbUser) => {
      res.json(dbUser);
    });
  });

  //Retrieving data from Login Register
  // app.post("/register", (req, res) => {
  //   db.Login.create({
  //     email: req.body.email
  //   }).then((dbLogin) => {
  //     res.json(dbLogin);
  //   });
  // });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};

