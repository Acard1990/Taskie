//To-Do
//==============================================================================


//$(selector).load(URL,data,callback);
$("#mainpage").load(function() {
  //login page load
  $("#logindiv").show();
  //for scotts sanity-- the closing of "on load"
});

//Get Started Now Button Function
$("#getstartedbtn").click(function() {
  console.log("get started");

});


//User Sign-In for registered users
//needs massive refinement
$("#signinbtn").click(function() {
  // enter keyed
  //if (e.keyCode == 13) {
  //$('#button_sign_in').trigger('click');
  //}
  console.log('logging in');
  $.ajax({
    url: "login",
    type: "post",
    data: $('#login_form').serialize(),
    dataType: 'json',
    success: function(data) {
      if (data.status == 'SUCCESS') {
        window.location = '';
      } else {
        $('#regnewuserbtn').;
      }
    },
    error: function(e) {
      console.log('error:' + e);
    }
  });
});


//User Registration Button ------    "No account Sign up"
$("#regnewuserbtn").click(function() {
  console.log("Registration");
  $("#registrationdiv").show();
});

//Forgot Password?
//$("#forgotpwbtn").click(function() {
//console.log("Forgot Password Clicked");
//});

//my account button
$("#myaccountbtn").click(function() {
  console.log("My Account");
  $("#maindiv").hide();
  $("#myaccountdiv").show();
});

//add task button
$("#addtaskbtn").click(function() {
  console.log("Adding Task");

});

//pick up task button
$("#pickupbtn").click(function() {
  console.log("Picking up task");
  $("#pickupbtn").fadeTo(100, 0.3);

});

//my task drop down menu
$("#mytaskbtn").click(function() {
  console.log("displaying my task");

  //$("#mytaskdiv").show();
  $("#mytaskdiv").fadeTo(100, 1.0);
});

//logout
$("#logoutbtn").click(function() {
  console.log("logout");

});





//==============================================================================
//==============================================================================
//random sandbox for various parts
//==============================================================================
//==============================================================================
//Geo-location block to retrieve current latitude and longitude

//var to hold current latitude, passed to Google API
var lat;
//var to hold current longitude, passed to Google API
var lon;

var getPosition = function(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

getPosition()
  .then((position) => {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
  })
  .catch((err) => {
    console.error(err.message);
  });

//==============================================================================
//==============================================================================
//logic structure
//==============================================================================
//==============================================================================
