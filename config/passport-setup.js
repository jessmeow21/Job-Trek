var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var sequelize = require("sequelize");
var User = require("../models/user");

passport.use(
    new GoogleStrategy({
    // options for the strategy
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log("passport cb fired");
    console.log(profile);
    new User({
        username: profile.displayName,
        googleId: profile.id
    }).save().then((newUser) => {
        console.log("new user created: " + newUser);
    })

})

);