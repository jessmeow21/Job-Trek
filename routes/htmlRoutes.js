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
      res.redirect(307, "/signup");
    }
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/landing");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  // App Routes: landing, profile, searchjob, history, trending
  app.get("/landing", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });
  
  app.get("/profile", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
  
  app.get("/searchjob", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/searchjob.html"));
  });
  
  app.get("/history", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/history.html"));
  });
    
  app.get("/trending", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/trending.html"));
  });

  app.get("/logout", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
