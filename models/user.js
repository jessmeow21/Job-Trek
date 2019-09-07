var sequelize = require("sequelize");

const User = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: DataTypes.STRING,
      googleId: DataTypes.STRING
    });
};

module.exports = User;