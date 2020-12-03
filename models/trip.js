// const { UUIDV4 } = require("sequelize/types");

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
        type: DataTypes.STRING,
        allowNull: true,
      },
      end: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      }
    });
    
  
    return trip;
  };