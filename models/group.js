module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define('Group', {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      }
    });
  
    Group.associate = function (models) {
      Group.hasMany(models.User, {
        onDelete: 'cascade',
      });
    };
  
    return Group;
  };