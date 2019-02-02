var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Results.findAll({}).then(function(dbRestaurants) {
      res.render("home", {
        msg: "Welcome!",
        restaurants: dbRestaurants
      });
    });
  });

  app.get("/restaurants", function(req, res) {
    res.render("index", {
      msg: "Welcome!",
      restaurants: apiResults
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/input", function(req, res) {
    setTimeout(function() {
      db.Selected_Location.findAll({
        limit: 1,
        where: {},
        order: [["createdAt", "DESC"]]
      }).then(function(dbData) {
        console.log(dbData[0].dataValues.name);
        res.render("input", {
          breweryName: dbData[0].dataValues.name,
          breweryAddress: dbData[0].dataValues.address
        });
      });
    }, 1000);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
