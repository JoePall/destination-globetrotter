module.exports = function (sequelize, DataTypes) {
    var Groups = sequelize.define('Groups', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      }
    });
  
    // Groups.associate = function (models) {
    //   Groups.hasMany(models.User, {
    //     onDelete: 'cascade',
    //   });
    // };
  
    return Groups;
  };