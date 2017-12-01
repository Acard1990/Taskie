// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Set Handlebars.
var exphbs = require("express-handlebars");
var app = express();

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express App
// =============================================================

var PORT = process.env.PORT || 8080;

app.get("/", function(req, res){
  res.render("index");
});
app.get("/home", function(req, res){
  res.render("index");
});
app.get("/about", function(req, res){
  res.render("about");
});
app.get("/contact", function(req, res){
  res.render("contact");
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
