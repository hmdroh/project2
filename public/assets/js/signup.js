$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstnameInput = $("input#first_name");
  var lastnameInput = $("input#last_name");
  var displaynameInput = $("input#display-name");
  var genderInput = $("select#gender");
  var dobInput = $("input#DOB"); 
  var activitylevelInput = $("select#activity-level");
  var activityInput = $("select#activities"); // needs process
  var dietaryresInput = $("select#food"); // needs process
  var zipcodeInput = $("input#zip-code");

  
  //displayname, gender, dob, activitylevel, 
  //activity, dietaryres, zipcode


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var activityInputs = "";
    for(var i =0; i<activityInput.val().length; i++){
      (i == 0)? comma="" : comma=",";
      activityInputs += comma+activityInput.val()[i];
    }
    var dietaryresInputs = "";
    for(var i =0; i<dietaryresInput.val().length; i++){
      (i == 0)? comma="" : comma=",";

      dietaryresInputs += comma+dietaryresInput.val()[i];
    }
 
    ///we just changed it to string from object to handle multiple input boxes input values for our prject in today
    
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstname: firstnameInput.val().trim(),
      lastname: lastnameInput.val().trim(),
      displayname: displaynameInput.val().trim(),
      gender: genderInput.val(),
      dob: dobInput.val(),
      activitylevel: activitylevelInput.val(),
      activity: activityInputs,
      dietaryres: dietaryresInputs,
      zipcode: zipcodeInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.displayname, userData.firstname, userData.lastname, userData.gender, userData.dob, userData.activitylevel, userData.activity, userData.dietaryres, userData.zipcode);
    emailInput.val("");
    passwordInput.val("");

  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, displayname, firstname, lastname, gender, dob, activitylevel, activity, dietaryres, zipcode) {
    $.post("/api/signup", {
      email: email,
      password: password,
      displayname: displayname,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      activitylevel: activitylevel,
      activity: activity,
      dietaryres: dietaryres,
      zipcode: zipcode
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
