// var db = require("../models");
var authenticate = require("../config/authenticate");
var path = require("path");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    console.log(req.user);
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    }
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/landing", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });

  app.get("/profile", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
