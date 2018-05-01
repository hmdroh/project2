// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Fevent = sequelize.define("Fevent", {
    // The email cannot be null, and must be a proper email before creation
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // The password cannot be null
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    local_date: {
      type: DataTypes.STRING
    },
    local_time: {
      type: DataTypes.STRING
    },
    link: {
      type: DataTypes.STRING
    },
    addressFromVenue: {
      type: DataTypes.STRING
    },
    group_name: {
      type: DataTypes.STRING
    },
    group_address: {
      type: DataTypes.STRING
    },
    group_url: {
      type: DataTypes.STRING
    },
    group_lat: {
      type: DataTypes.STRING
    },
    group_lng: {
      type: DataTypes.STRING
    },
    venue_name: {
      type: DataTypes.STRING
    },
    venue_address: {
      type: DataTypes.STRING
    },
    venue_lat: {
      type: DataTypes.STRING
    },
    venue_lng: {
      type: DataTypes.STRING
    }

    
  });
  return Fevent;
};
