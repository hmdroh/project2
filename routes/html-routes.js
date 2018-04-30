// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var express = require("express");

// Dependencies
// =============================================================
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");
var request = require("request");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/eats", function (req, res) {
    res.redirect("/eats/1");
  });

  app.get("/eats/:offset", function (req, res) {


    // request.get("http://localhost:8080/api/getjson/exampleS2.json", function (err, body) {
    //   var b = JSON.parse(body.body);
    //   var data = [];
    //   // res.json(b);
    //   for(var i=0; i<b.results.length; i++){
    //     var thisR = {
    //       title: b.results[i].title,
    //       recipe_id: b.results[i].id,
    //       image_url: b.baseUri+b.results[i].image
    //     };
    //     data.push(thisR);
    //   }
    //   res.render("eats", {
    //     page:{
    //     title: "Reciepe List from spoon-"},
    //     boo: data});
    // });

    var query = "chicken"; //required
    var number = 20;
    var offset = (parseInt(req.params.offset) - 1) * number;
    var type = "";
    var intolerances = "";
    var excludeIngredients = "";
    var diet = "";
    var cuisine = "";

    var url =
      `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?` +
      `query=${query}` + //The (natural language) recipe search query.
      `&number=${number}` +
      `&type=${type}` + // main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink
      `&intolerances=${intolerances}` + //A comma-separated list of intolerances, Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
      `&instructionsRequired=true` + // true false, Whether the recipes must have instructions.
      `&limitLicense=false` +
      `&offset=${offset}` +
      `&excludeIngredients=${excludeIngredients}` + //An comma-separated list of ingredients or ingredient types that must not be contained in the recipes.
      `&diet=${diet}` + // The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
      `&cuisine=${cuisine}` // One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.
    request({
      headers: {
        'X-Mashape-Key': process.env.SPOONACULAR_KEY
      },
      uri: url,
      method: 'GET'
    }, function (err, body) {
      var b = JSON.parse(body.body);
      // res.json(b);
      var data = [];
      for (var i = 0; i < b.results.length; i++) {
        var thisR = {
          title: b.results[i].title,
          recipe_id: b.results[i].id,
          image_url: b.baseUri + b.results[i].image
        };
        data.push(thisR);
      }

      if (parseInt(req.params.offset) + 1 > 1) {
        var firstOffset = false;
      } else {
        var firstOffset = true;
      }
      res.render("eats", {
        page: {
          title: "Reciepe List from spoon-",
          nextOffset: parseInt(req.params.offset) + 1,
          firstOffset: firstOffset
        },
        boo: data
      });

    });


  });






  app.get("/eats2", function (req, res) {
    request.get("http://localhost:8080/api/getjson/example1.json", function (err, body) {
      var b = JSON.parse(body.body);
      var data = [];
      // res.json(b);
      for (var i = 0; i < b.recipes.length; i++) {
        var thisR = {
          title: b.recipes[i].title,
          recipe_id: b.recipes[i].recipe_id,
          image_url: b.recipes[i].image_url
        };
        data.push(thisR);
      }
      res.render("eats2", {
        page: {
          title: "Reciepe List"
        },
        boo: data
      });
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
        page: {
          title: "Reciepe 1"
        },
        boo: data
      });
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
        page: {
          title: "Reciepe Test"
        },
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

    var page = 100;
    var text = req.user.activity;
    var radius = 25.0;
    var lng = req.user.lng;
    var lat = req.user.lat;
    var key = process.env.MEETUP_KEY;

    var url =
      `https://api.meetup.com/find/upcoming_events?photo-host=public` +
      `&page=${page}` +
      `&text=${text}` +
      `&radius=${radius}` +
      `&lon=${lng}` +
      `&lat=${lat}` +
      `&key=${key}`
    request({
      uri: url,
      method: 'GET'
    }, function (err, body) {
      var b = JSON.parse(body.body);
    
      var data = [];
      for (var i = 0; i < b.events.length; i++) {

        if(b.events[i].local_date){
        if (b.events[i].venue) {
          var thisR = {
            name: b.events[i].name,
            id: b.events[i].id,
            local_date: b.events[i].local_date,
            local_time: b.events[i].local_time,
            link: b.events[i].link,
            addressFromVenue: true,
            group_name: b.events[i].group.name,
            group_address: b.events[i].group.localized_location,
            venue_name: b.events[i].venue.name,
            venue_address: b.events[i].venue.address_1 + ", " + b.events[i].venue.city + ", " + b.events[i].venue.country,
            description: b.baseUri + b.events[i].description
          };
          data.push(thisR);
        }else{
          var thisR = {
            name: b.events[i].name,
            id: b.events[i].id,
            local_date: b.events[i].local_date,
            local_time: b.events[i].local_time,
            link: b.events[i].link,
            addressFromVenue: false,
            group_name: b.events[i].group.name,
            group_address: b.events[i].group.localized_location,
            venue_name: "",
            venue_address: "",
            description: ""
          };
          data.push(thisR);
        }
      }
      }

      if (parseInt(req.params.offset) + 1 > 1) {
        var firstOffset = false;
      } else {
        var firstOffset = true;
      }
      res.render("activities", {
        page: {
          title: "List of events",
          nextOffset: parseInt(req.params.offset) + 1,
          firstOffset: firstOffset
        },
        boo: data
      });

    });


  });

  // app.get("/activities", function (req, res) {
  //   res.render("activities");

  // });

  // app.get("/eats", function (req, res) {
  //   res.render("eats");
  // });

  // app.get("/recipe", function (req, res) {
  //   res.render("recipe");
  // });

  // app.get("/activity", function (req, res) {
  //   res.render("activity");
  // });

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
