module.exports = function (sequelize, DataTypes) {
  var user_group = sequelize.define("user_group", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return user_group;
};
