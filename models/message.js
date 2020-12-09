module.exports = function (sequelize, DataTypes) {
    var message = sequelize.define('message', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tripId: {
        type: DataTypes.UUID,
        allowNull: false,
      }
    });

    return message;
  };