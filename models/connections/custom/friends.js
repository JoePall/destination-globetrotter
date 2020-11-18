module.exports = function (sequelize, DataTypes) {
  var friends = sequelize.define("friends", {
    userAId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userBId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return friends;
};
