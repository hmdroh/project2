
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var path = require("path");

var passport = require("../config/passport");
var request = require("request");
var eventcontroller = require("../controllers/eventcontroller");
var meetup = require("../controllers/meetup");
var zipcodecontroller = require("../controllers/zipcodecontroller");
// Routes
// =============================================================
module.exports = function (app) {


  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/");

  });

  app.post("/api/signup", function (req, res) {
    // console.log(req.body);
    //calculating lat and lng:
    var zipcode = req.body.zipcode;
    zipcodecontroller.getlongLat(process.env.ZIPCODEAPI, zipcode, function (b) {

      db.User.create({
        email: req.body.email,
        password: req.body.password,
        displayname: req.body.displayname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        activitylevel: req.body.activitylevel,
        activity: req.body.activity,
        dietaryres: req.body.dietaryres,
        allergies: req.body.allergies,
        zipcode: req.body.zipcode,
        lat: b[zipcode].lat,
        lng: b[zipcode].lng

      }).then(function () {
        res.redirect(307, "/api/login");
      }).catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });

    });


  });


  app.get("/api/fevent/:id/:url", function (req, res) {
    var activity_id = req.params.id;
    var group_url = req.params.url;
    var key = process.env.MEETUP_KEY;

    var isFav = eventcontroller.isFavorate(req.user.id, activity_id, function (cb) {
      if (cb) {
        res.redirect("/activities");
      } else {
        //does not exits;
        meetup.getMeetupDataById(key, group_url, activity_id, function (data) {

          db.Fevent.create({
            userId: req.user.id,
            eventId: req.params.id,
            name: data[0].name,
            local_date: data[0].local_date,
            local_time: data[0].local_time,
            link: data[0].link,
            addressFromVenue: data[0].addressFromVenue,
            group_name: data[0].group_name,
            group_address: data[0].group_address,
            group_url: data[0].group_url,
            group_lat: data[0].group_lat,
            group_lng: data[0].group_lng,
            venue_name: data[0].venue_name,
            venue_address: data[0].venue_address,
            venue_lat: data[0].venue_lat,
            venue_lng: data[0].venue_lng

          }).then(function () {
            res.redirect("/activities");
          }).catch(function (err) {
            console.log(err);
            // res.json(err);
            // res.status(422).json(err.errors[0].message);
          });


        })

      }
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.render("home");
  });
};
