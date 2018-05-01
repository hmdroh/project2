var db = require("../models");
var request = require("request");

var zipcodecontroller = {
    getlongLat: function (ZIPCODEAPI, zipcode, cb) {
        request.get(`https://www.zipcodeapi.com/rest/${ZIPCODEAPI}/multi-info.json/${zipcode}/degrees`, function(err,body){
        var b = JSON.parse(body.body);
        //callback data:    
            cb(b);
        });
    }
}
module.exports = zipcodecontroller;
