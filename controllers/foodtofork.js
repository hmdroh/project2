var request = require("request");

//getting the list:
var API1KEY = process.env.FOOD_2_FORK;
var Q = "paleo";

var APIURL = "http://food2fork.com/api/search?key="+API1KEY+"&q=" + Q;

//getting searc by id:
var rId = "679b03";
var APIURL2 = "http://food2fork.com/api/get?key="+API1KEY+"&rId=" + rId;

// var orm = {
//     getFoodList: function(dietary, allergies, callback){
//         var dietary = dietary.split(",");
//     },
//     getRe: function(rId){
//         var rId =rId;
//         var APIURL2 = "http://food2fork.com/api/get?key="+API1KEY+"&rId=" + rId;
//         req.get(URL)
//     }
// }
// function 
// function getOneRecipeById(id, callback) {
//     // doe the request
//     // pass data to callback
// }