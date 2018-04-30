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

//getting searc by id:


// Routes
// =============================================================
module.exports = function (app) {

  app.get("/eats", function (req, res) {
    request.get("http://localhost:8080/api/getjson/exampleS1.json", function (err, body) {
      var b = JSON.parse(body.body);
      var data = [];
      // res.json(b);
      for(var i=0; i<b.results.length; i++){
        var thisR = {
          title: b.results[i].title,
          recipe_id: b.results[i].id,
          image_url: b.baseUri+b.results[i].image
        };
        data.push(thisR);
      }
      res.render("eats2", {
        page:{
        title: "Reciepe List 2"},
        boo: data});
    });
  });


  app.get("/list", function (req, res) {
    request.get("http://localhost:8080/api/getjson/example1.json", function (err, body) {
      var b = JSON.parse(body.body);
      var data = [];
      // res.json(b);
      for(var i=0; i<b.recipes.length; i++){
        var thisR = {
          title: b.recipes[i].title,
          recipe_id: b.recipes[i].recipe_id,
          image_url: b.recipes[i].image_url
        };
        data.push(thisR);
      }
      res.render("eats2", {
        page:{
        title: "Reciepe List"},
        boo: data});
    });
  });


  app.get("/recipe1", function (req, res) {
    // rId = req.params.id;
    request.get("http://localhost:8080/api/getjson/example2.json", function (err, body) {
      var b = JSON.parse(body.body);
      b = b.recipe;
      var data = [];
      // res.json(b);
      var dataob = {
        recipe_id: b.recipe_id,
        image_url: b.image_url,
        title: b.title,
        ingredients: b.ingredients,
        source_url: b.source_url
      };

      data.push(dataob);
      // res.json(data);
      res.render("recipe2", {
        page:{
        title: "Reciepe 1"},
        boo: data});
    });

  });

  app.get("/recipe", function (req, res) {
    // rId = req.params.id;
    request.get("http://localhost:8080/api/getjson/examplesS1Rid.json", function (err, body) {
      var b = JSON.parse(body.body);
      // b = b;
      var data = [];
      // res.json(b);
      var dataob = {
        recipe_id: b.id,
        image_url: b.image,
        title: b.title,
        ingredients: b.extendedIngredients,
        directions: b.instructions,
        readyInMinutes: b.readyInMinutes
      };

      data.push(dataob);
      // res.json(data);
      res.render("recipe3", {
        page:{
        title: "Reciepe Test"},
        boo: data
      });
    });

  });


  app.get("/", function (req, res) {
    res.render("home");
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
  });



  app.get("/signup", function (req, res) {
    res.render("signup");

  });



  app.get("/success", function (req, res) {

    // if(!req.params.user || !req.params.pass){
    //   //return true if empty
    //   res.render("success");
    // }else{
    //   /// process the login automatically:
    //   var userpass = {
    //     user: req.params.user,
    //     pass: req.params.pass
    //   };
    //   res.json(userpass);

    // }
    res.render("success");

  });

  app.get("/activities", function (req, res) {
    res.render("activities");

  });

  // app.get("/eats", function (req, res) {
  //   res.render("eats");

  // });

  // app.get("/recipe", function (req, res) {
  //   res.render("recipe");

  // });

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
      res.redirect("/success");
    } else {
      res.render("login");
    }
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
