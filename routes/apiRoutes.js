var db = require("../models");
var passport = require("../config/passport");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
// var authenticate = require("../config/authenticate");

module.exports = function(app) {
  // Log In Existing User
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // If user is Authenticated then return back JWT w/id & email
    //const token = jwt.sign({ user: user.id }, 'secret_key_goes_here');
    // var token = jwt.sign({
    //   user: req.user.UserId,
    //   email: req.user.email
    // },
    // process.env.JWT_SECRET_KEY);

    // res.json({
    //   message: 'Authenticated! Use this token in the "Authorization" header',
    //   token: token
    // });
    res.json(req.user);
  });

  // Create Login for New User
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Create a new Job...
  app.post("/api/job", function(req, res) {
    db.Job.create(req.body).then(function(dbJob) {
      res.json(dbJob);
    });
  });

  // GET route to return a User's jobs...
  app.get("/api/job", function(req, res) {
    //res.json(req.user);
    // res.send(req.user);
    db.Job.findAll({
      where: {
        // UserId: req.user.UserId
        UserId: 1,
        status: {
          [Op.ne]: "D"
        }
      }
    }).then(function(dbJob) {
      res.json(dbJob);
    });
  });

  // app.get("/api/test", passport.authenticate("local"), function(req, res) {
  //   res.json({ description: "Dan's API. Please authenticate!" });
  //   //res.json(req.user);
  // });

  // app.post('/api/login2', (req, res) => {
  //   // insert code here to actually authenticate, or fake it
  //   const user = { id: 3 };
  //   // then return a token, secret key should be an env variable
  //   const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET_KEY);
  //   res.json({
  //     message: 'Authenticated! Use this token in the "Authorization" header',
  //     token: token
  //   });
  // });

  // app.get('/api/protected', ensureToken, (req, res) => {
  //   jwt.verify(req.token, process.env.JWT_SECRET_KEY, function(err, data) {
  //     if (err) {
  //       res.sendStatus(403);
  //     } else {
  //       res.json({
  //         description: 'Protected information. Congrats!'
  //       });
  //     }
  //   });
  // });

  // function ensureToken(req, res, next) {
  //   const bearerHeader = req.headers["authorization"];
  //   if (typeof bearerHeader !== 'undefined') {
  //     const bearer = bearerHeader.split(" ");
  //     const bearerToken = bearer[1];
  //     req.token = bearerToken;
  //     next();
  //   } else {
  //     res.sendStatus(403);
  //   }
  // }
};
