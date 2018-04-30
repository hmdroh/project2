
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

// Routes
// =============================================================
module.exports = function(app) {


  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/success");
  });

  app.post("/api/signup", function(req, res) {
    // console.log(req.body);
    //calculating lat and lng:
    var zipcode = req.body.zipcode;
    request.get(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODEAPI}/multi-info.json/${zipcode}/degrees`, function(err,body){
      var b = JSON.parse(body.body);

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
  
      }).then(function() {
        res.redirect(307, "/api/login");
      }).catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });

    });

    
  });







  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.end(false);
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        displayname: req.user.displayname,
        gender: req.user.gender,
        dob: req.user.dob,
        activitylevel: req.user.activitylevel,
        activity: req.user.activity,
        allergies: req.user.allergies,
        dietaryres: req.user.dietaryres,
        zipcode: req.user.zipcode,
        lat: req.user.lat,
        lng: req.user.lng
      });
    }
  });

///testing purpose:
  app.get("/api/getjson/:filename", function(req, res) {
    if(req.params.filename){
    res.sendFile(path.join(__dirname,`../public/jsons/${req.params.filename}`));
    }else{
      res.end(false);
    }
  });

  /////////////////////////////////////////end of passport api



  // GET route for getting all of the posts
  // app.get("/api/posts", function(req, res) {
  //   // var query = {};
  //   // if (req.query.author_id) {
  //   //   query.AuthorId = req.query.author_id;
  //   // }
  //   // // 1. Add a join here to include all of the Authors to these posts
  //   // db.Post.findAll({
  //   //   include: [db.Author],
  //   //   where: query
  //   // }).then(function(dbPost) {
  //   //   res.json(dbPost);
  //   // });
  // });

  // // Get route for retrieving a single post
  // app.get("/api/posts/:id", function(req, res) {
  //   // 2. Add a join here to include the Author who wrote the Post
  //   // db.Post.findOne({
  //   //   include: [db.Author],
  //   //   where: {
  //   //     id: req.params.id
  //   //   }
  //   // }).then(function(dbPost) {
  //   //   console.log(dbPost);
  //   //   res.json(dbPost);
  //   // });
  // });

  // // POST route for saving a new post
  // app.post("/api/posts", function(req, res) {
  //   // db.Post.create(req.body).then(function(dbPost) {
  //   //   res.json(dbPost);
  //   // });
  // });

  // // DELETE route for deleting posts
  // app.delete("/api/posts/:id", function(req, res) {
  //   // db.Post.destroy({
  //   //   where: {
  //   //     id: req.params.id
  //   //   }
  //   // }).then(function(dbPost) {
  //   //   res.json(dbPost);
  //   // });
  // });

  // // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   // db.Post.update(
  //   //   req.body,
  //   //   {
  //   //     where: {
  //   //       id: req.body.id
  //   //     }
  //   //   }).then(function(dbPost) {
  //   //   res.json(dbPost);
  //   // });
  // });


};
