// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express");

// Dependencies
// =============================================================
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

var request = require("request");

//getting the list:
var API1KEY = "0df5e88330d88cc67aa6056e35ac48e6";
var Q = "paleo";

var APIURL = "http://food2fork.com/api/search?key=" + API1KEY + "&q=" + Q;

//getting searc by id:
var rId = "679b03";
var APIURL2 = "http://food2fork.com/api/get?key=" + API1KEY + "&rId=" + rId;


var API2KEY = "5575c3141757734d74930b6d97e";
var Q1 = "hiking";
//api.meetup.com
// /2/events


 //var APIURL3 = "https://www.meetup.com/meetup_api/search?key="


// Routes
// =============================================================
module.exports = function (app) {

  app.get("/test", function (req, res) {
    
    request.get(APIURL, function (err, body) {
      var b = JSON.parse(body.body);
      res.json(b);
    });

  });


  app.get("/test2", function (req, res) {
    request.get(APIURL2, function (err, body) {
      var b = JSON.parse(body.body);
      res.json(b);
    });

  });

  app.get("/events/:event/:zipcode", function (req, res) {
    var APIURL3 = "https://api.meetup.com/2/open_venues?&sign=true&photo-host=public&text="+req.params.event+"&zip="+req.params.zipcode+"&country=usa&page=20&key="+ API2KEY + "&q1+=" + Q1;
    console.log(APIURL3);
    request.get(APIURL3, function (err, body) {
      var b = JSON.parse(body.body);
      res.json(b);
    });

  });


  app.get("/", function (req, res) {
    res.render("home");
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  app.get("/signup", function (req, res) {
    res.render("signup");

  });

  app.get("/login", function (req, res) {
    res.render("login");

  });

  app.get("/success", function (req, res) {
    res.render("success");

  });

  app.get("/activities", function (req, res) {
    res.render("activities");

  });

  app.get("/eats", function (req, res) {
    res.render("eats");

  });

  app.get("/recipe", function (req, res) {
    res.render("recipe");

  });

  app.get("/activity", function (req, res) {
    res.render("activity");

  });

  app.get("/favorites", function (req, res) {
    res.render("favorites");

  });





  //Passport routes to add to regaular paths

  //cms route loads cms.html

  app.get("/cms", function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/cms.html"));
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
    // res.sendFile(path.join(__dirname, "../public/login.html"));
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





  ///////////////end of passport
  // Each of the below routes just handles the HTML page that the user gets sent to.


  // index route loads view.html
  // app.get("/", function(req, res) {
  //   res.render("index");
  //   // res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // // cms route loads cms.html
  // app.get("/cms", function(req, res) {
  //   // res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });


};
