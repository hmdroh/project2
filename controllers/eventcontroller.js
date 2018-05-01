var db = require("../models");
var eventcontroller = {
    isFavorate: function(userId, eventId, cb){
        db.Fevent.findOne({
            where:{
                userId: userId,
                eventId: eventId
            }
        }).then(function(data){
            if(data){
                cb(true);
            }else{
                cb(false);
            }
        })
    }
}
module.exports = eventcontroller;
