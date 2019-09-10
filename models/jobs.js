module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        position: DataTypes.STRING,
        company: DataTypes.STRING,
        status: DataTypes.STRING,
        notes: DataTypes.TEXT,
        salaryMin: DataTypes.INTEGER,
        salaryMax: DataTypes.INTEGER,
    });

    Job.associate = function(models) {
        // We're saying that a Job should belong to a User
        // A Job can't be created without an User due to the foreign key constraint
        Job.belongsTo(models.User, {
            // foreignKey: {
            //   allowNull: false
            // }
        });
    };

    return Job;
};