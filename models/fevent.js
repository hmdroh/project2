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
    eventURL:{
      type: DataTypes.STRING
    },
    eventDateTime:{
      type: DataTypes.STRING
    }
    
  });
  return Fevent;
};
