//To-Do
//==============================================================================
//load getstarteddiv
//user will click getstartedbtn.
//hide getstarteddiv
//show logindiv
//user will input data
//user will click logingtn
//hide logindiv
//show mainpagediv

//user will click add task
//seperate page or simple input form?

//user will click pickup task
//dim task under pickuptask area
//add task under your account cue

//user will click logoutbtn
//hide mainpagediv
//show getstarteddiv




//==============================================================================
//==============================================================================
//==============================================================================
//$(selector).load(URL,data,callback);
$("#getstarteddiv").load(function() {
    getstarted();
});

//Get Started
function getstarted() {
  //getstarteddiv should already be loaded.
  $("#getstartedbtn").click() {
    console.log("get started");
    $("#getstarteddiv").hide();
    $(#logindiv).show();
  }
});

// on login page ===============================================================
//needs massive refinement
$("#loginbtn").click(function() {
  console.log('logging in');
  if (e.keyCode == 13) {
  $('#loginbtn').trigger('click');
  }
  $.ajax({
    url: "login",
    type: "post",
    data: $('#login_form').serialize(),
    dataType: 'json',
    success: function(data) {
      if (data.status == 'SUCCESS') {
        window.location = '';
      } else {
        regnewuser();
      }
    },
    error: function(e) {
      console.log('error:' + e);
    }
  });
});

// on registration page ========================================================
function regnewuser () {
  $("#logindiv").hide();
  $("#regnewuserdiv").show();
};

//User Registration Button ------    "No account Sign up"
$("#regnewuserbtn").click(function() {
  console.log("Registration started");
  $("#registrationdiv").show();
});

//Forgot Password?
//$("#forgotpwbtn").click(function() {
//console.log("Forgot Password Clicked");
//});



//on main page =================================================================
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

//google map stuff==============================================================

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
