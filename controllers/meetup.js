var db = require("../models");
var request = require("request");

var meetupcontroller = {
    getMeetupDataById: function (key, group_url, activity_id, cb) { 
        var url =
      `https://api.meetup.com/${group_url}/events/${activity_id}?photo-host=public` +
      `&key=${key}`
    request({
      uri: url,
      method: 'GET'
    }, function (err, body) {
      var b = JSON.parse(body.body);
      var data = [];
          if (b.venue) {
            var thisR = {
              name: b.name,
              id: b.id,
              local_date: b.local_date,
              local_time: b.local_time,
              link: b.link,
              addressFromVenue: true,
              group_name: b.group.name,
              group_address: b.group.localized_location,
              group_url: b.group.urlname,
              group_lat: b.group.lat,
              group_lng: b.group.lon,
              venue_name: b.venue.name,
              venue_address: b.venue.address_1 + ", " + b.venue.city + ", " + b.venue.country,
              venue_lat: b.venue.lat,
              venue_lng: b.venue.lon,
              description: b.description.replace(/<\/?[^>]+(>|$)/g, "")
            };
            data.push(thisR);
          } else {
            var thisR = {
              name: b.name,
              id: b.id,
              local_date: b.local_date,
              local_time: b.local_time,
              link: b.link,
              addressFromVenue: false,
              group_name: b.group.name,
              group_address: b.group.localized_location,
              group_url: b.group.urlname,
              group_lat: b.group.lat,
              group_lng: b.group.lon,
              venue_name: "",
              venue_address: "",
              venue_lat: "",
              venue_lng: "",
              description: ""
            };
            data.push(thisR);
          }

    //callback data
    cb(data);
        });

    },
    getMeetupData: function (key, page, text,radius,lng,lat,key, cb) { 
        ///get meetup data:

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
        if (b.events[i].local_date) {
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
                group_url: b.events[i].group.urlname,
                group_lat: b.events[i].group.lat,
                group_lng: b.events[i].group.lon,
                venue_name: b.events[i].venue.name,
                venue_address: b.events[i].venue.address_1 + ", " + b.events[i].venue.city + ", " + b.events[i].venue.country,
                venue_lat: b.events[i].venue.lat,
                venue_lng: b.events[i].venue.lon,
                description: b.events[i].description,
                Fav: false
              };
              data.push(thisR);
            } else {
              var thisR = {
                name: b.events[i].name,
                id: b.events[i].id,
                local_date: b.events[i].local_date,
                local_time: b.events[i].local_time,
                link: b.events[i].link,
                addressFromVenue: false,
                group_name: b.events[i].group.name,
                group_address: b.events[i].group.localized_location,
                group_url: b.events[i].group.urlname,
                group_lat: b.events[i].group.lat,
                group_lng: b.events[i].group.lon,
                venue_name: "",
                venue_address: "",
                venue_lat: "",
                venue_lng: "",
                description: b.events[i].description,
                Fav: false
                
              };
              data.push(thisR);
            }

          
        }
      }
        cb(data);
    });
    
    }
}
module.exports = meetupcontroller;
