// var db = require("../models");
var authenticate = require("../config/authenticate");
var path = require("path");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    console.log(req.user);
    if (req.user) {
      res.redirect("/landing");
    } else {
      res.redirect(307, "/signup");
    }
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/login");
    } else {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    }
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/landing");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/landing", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });

  // Displays a user, or returns false
  // app.get("/landing/userId", function(req, res) {
  //   var userId = req.user.id;
  //   res.send(userId);

  //   return res.json(false);
  // });

  app.get("/logout", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
