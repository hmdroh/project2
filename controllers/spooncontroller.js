var db = require("../models");
var request = require("request");

var spooncontroller = {
    getSpoonDataById: function (key, rId, cb) { 
        var url =
        `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${rId}/information`;

        request({
            headers: {
              'X-Mashape-Key': key
            },
            uri: url,
            method: 'GET'
          }, function (err, body) {
            var b = JSON.parse(body.body);
            var data = [];
      var dataob = {
        recipe_id: b.id,
        image_url: b.image,
        title: b.title,
        ingredients: b.extendedIngredients,
        directions: b.instructions,
        readyInMinutes: b.readyInMinutes
      };

      data.push(dataob);
      cb(data);
          
        });
    },
    getSpoonData: function (query, number, offset,type,intolerances,excludeIngredients,diet,cuisine, cb) { 
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
        cb(data);
         });
    }
}
module.exports = spooncontroller;
