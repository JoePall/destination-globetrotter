module.exports = function (sequelize, DataTypes) {
    var Connection = sequelize.define('Connection', {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      groupId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      }
    });
  
    return Connection;
  };