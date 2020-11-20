module.exports = function (sequelize, DataTypes) {
    var trip = sequelize.define('trip', {
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      start: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  
    return trip;
  };