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

    return Groups;
  };