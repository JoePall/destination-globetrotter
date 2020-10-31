module.exports = function (sequelize, DataTypes) {
    var Trips = sequelize.define('Trips', {
      loactionOne: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      locationTwo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      locationThree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      locationFour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    });
  
    Trips.associate = function (models) {
      Trips.hasMany(models.User, {
        onDelete: 'cascade',
      });
    };
  
    return Trips;
  };