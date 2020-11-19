module.exports = function (sequelize, DataTypes) {
  var user_user = sequelize.define("user_user", {
    userAId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userBId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return user_user;
};
