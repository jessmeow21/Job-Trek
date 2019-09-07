var router = require("express").Router();
var passport = require("passport");

// auth login
router.get("/login", (req, res) => {
    res.render("index");
});

//  auth logout
router.get("/logout", (req, res) => {
    //  handle with Passport
    res.send("logging out");
});

//  auth with Google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

//  callback function for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("you've reached callback URI");
})

module.exports = router;