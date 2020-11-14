module.exports = function (sequelize, DataTypes) {
    var trip = sequelize.define('trip', {
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    });
  
    return trip;
  };