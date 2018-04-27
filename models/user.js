// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname:{
      type: DataTypes.STRING
    },
    lastname:{
      type: DataTypes.STRING
    },
    displayname: {
        type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
      validate:{
        len: [1,1]
      }
    },
    dob:{
      type: DataTypes.STRING
    },
    activitylevel: {
      type: DataTypes.INTEGER,
      validate:{
        max: 5,                  // only allow values <= 5
        min: 1,                  // only allow values >= 1
      }
    },
    activity:{
      type: DataTypes.STRING
    },
    dietaryres: {
      type: DataTypes.STRING
    },
    zipcode:{
      type: DataTypes.INTEGER
    }
    
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
