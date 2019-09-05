module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    company: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating Users with Jobs
    // When an User is deleted, also delete any associated Jobs
    User.hasMany(models.Job, {
      onDelete: "cascade"
    });
  };

  return User;
};
