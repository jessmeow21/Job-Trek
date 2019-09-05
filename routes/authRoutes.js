var router = require("express").Router();

// auth login
router.get("/login", (req, res) => {
    res.render("logging");
});

// auth logout
router.get("/logout", (req, res) => {
    //handle with Passport
    res.render("logging out");
});

//auth with Google
router.get("/google", (req, res) => {
    //handle with Passport
    res.send("logging in with Google");
});

module.exports = router;