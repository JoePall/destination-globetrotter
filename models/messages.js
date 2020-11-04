module.exports = function (sequelize, DataTypes) {
    var Messages = sequelize.define('Messages', {
      messageOne: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      messageTwo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      messageThree: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      messageFour: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    });
  
    Messages.associate = function (models) {
      Messages.hasMany(models.User, {
        onDelete: 'cascade',
      });
    };
  
    return Messages;
  };