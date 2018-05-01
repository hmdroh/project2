// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express");

// Dependencies
// =============================================================
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");
var request = require("request");
var eventcontroller = require("../controllers/eventcontroller");
var meetup = require("../controllers/meetup");
var spooncontrol = require("../controllers/spooncontroller");
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {

    res.render("home", { isLoggedIn: (req.session.passport ? true : false) });
  });

  app.get("/eats", isAuthenticated, function (req, res) {
    res.redirect("/eats/1");
  });

  app.get("/eats/:offset", function (req, res) {
    if (!req.user) {
      res.redirect("/login");
    } else {
      var query = "healthy"; //required
      var number = 20;
      var offset = (parseInt(req.params.offset) - 1) * number;
      var type = "";
      var intolerances = "";
      var excludeIngredients = req.user.allergies;
      var diet = req.user.dietaryres;
      var cuisine = "";

      spooncontrol.getSpoonData(query, number, offset, type, intolerances, excludeIngredients, diet, cuisine, function (data) {

        if (parseInt(req.params.offset) + 1 > 1) {
          var firstOffset = false;
        } else {
          var firstOffset = true;
        }
        res.render("eats", {
          page: {
            title: "Eats",
            nextOffset: parseInt(req.params.offset) + 1,
            firstOffset: firstOffset
          },
          boo: data,
          isLoggedIn: (req.session.passport ? true : false)
        });

      });

    }
  });


  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/success", isAuthenticated, function (req, res) {
    var hbsObj = {
      isLoggedIn: (req.session.passport ? true : false)
    }
    res.render("success", hbsObj);

  });


  app.get("/activities", isAuthenticated, function (req, res) {
    if (!req.user) {
      res.redirect("/");
    } else {
      var page = 100;
      var text = req.user.activity;
      var radius = 25.0;
      var lng = req.user.lng;
      var lat = req.user.lat;
      var key = process.env.MEETUP_KEY;
      meetup.getMeetupData(key, page, text, radius, lng, lat, key, function (data) {

        if (parseInt(req.params.offset) + 1 > 1) {
          var firstOffset = false;
        } else {
          var firstOffset = true;
        }

        res.render("activities", {
          page: {
            title: "Activities",
            nextOffset: parseInt(req.params.offset) + 1,
            firstOffset: firstOffset
          },
          boo: data,
          isLoggedIn: (req.session.passport ? true : false)
        });
      });
    }
  });



  app.get("/favorites", isAuthenticated, function (req, res) {
    var key = process.env.MEETUP_KEY;

    db.Fevent.findAll({
      where: {
        userId: req.user.id
      }
    }).then(function (sqldata) {

      res.render("fav", {
        page: {
          title: "Favorite Events",
          nextOffset: parseInt(req.params.offset) + 1
        },
        boo: sqldata,
        isLoggedIn: (req.session.passport ? true : false)
      });
    });
  });


  app.get("/activity/:url/:id", isAuthenticated, function (req, res) {

    var activity_id = req.params.id;
    var group_url = req.params.url;

    var key = process.env.MEETUP_KEY;
    meetup.getMeetupDataById(key, group_url, activity_id, function (data) {

      if (parseInt(req.params.offset) + 1 > 1) {
        var firstOffset = false;
      } else {
        var firstOffset = true;
      }
      res.render("activity", {
        page: {
          title: data[0].name,
          nextOffset: parseInt(req.params.offset) + 1,
          firstOffset: firstOffset
        },
        boo: data,
        isLoggedIn: (req.session.passport ? true : false)
      });
    });

  });


  app.get("/recipe/:id", isAuthenticated, function (req, res) {
    rId = req.params.id;
    spooncontrol.getSpoonDataById(process.env.SPOONACULAR_KEY, rId, function (data) {
      res.render("recipe3", {
        page: {
          title: "Recipe"
        },
        boo: data,
        isLoggedIn: (req.session.passport ? true : false)
      });
    });

  });

  //Passport routes to add to regaular paths
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    } else {
      res.render("login");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members");
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/user", isAuthenticated, function (req, res) {
    res.render("members");
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
