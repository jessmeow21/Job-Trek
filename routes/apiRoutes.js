var db = require("../models");

module.exports = function(app) {
    // Get all examples
    app.get("/api/examples", function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", function(req, res) {
        db.Example.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(
            dbExample
        ) {
            res.json(dbExample);
        });
    });

    // Create a new Job...
    app.post("/api/job", function(req, res) {
        db.Job.create(req.body).then(function(dbJob) {
            res.json(dbJob);
        });
    });

    app.get("/api/job", function(req, res) {
        db.Job.findAll({
            where:
        })
    })

};