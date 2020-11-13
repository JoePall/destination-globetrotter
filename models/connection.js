module.exports = function (sequelize, DataTypes) {
    var Connection = sequelize.define('Connection', {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      groupIdOne: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      groupIdTwo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      groupIdThree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      }
    });
    
  
    // Connection.associate = function (models) {
    //   Connection.hasMany(models.User, {
    //     onDelete: 'cascade',
    //   });
    // };
  
    return Connection;
  };