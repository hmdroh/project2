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

var APIURL = "http://food2fork.com/api/search?key="+API1KEY+"&q=" + Q;

//getting searc by id:
var rId = "679b03";
var APIURL2 = "http://food2fork.com/api/get?key="+API1KEY+"&rId=" + rId;


var API2KEY = "5575c3141757734d74930b6d97e"; 
var Q1 = "hiking";
//api.meetup.com
// /2/events
 
var APIURL3 = "https://api.meetup.com/&sign=true&photo-host=public&search="+API2KEY+"&q1+=" + Q1;
// var APIURL3 = "https://www.meetup.com/meetup_api/search?key="+API2KEY+"&q=" + Q1; 


// Routes
// =============================================================
module.exports = function(app) {

  app.get("/test", function(req, res) {
    request.get(APIURL, function(err,body){
      var b = JSON.parse(body.body);
      res.json(b);
    });
   
  });


  app.get("/test2", function(req, res) {
    request.get(APIURL2, function(err,body){
      var b = JSON.parse(body.body);
      res.json(b);
    });
   
  });

  app.get("/test3", function(req, res) {
    request.get(APIURL3, function(err,body){
      var b = JSON.parse(body.body);
      res.json(b);
    });
   
  });
  

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/user", isAuthenticated, function(req, res) {
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
