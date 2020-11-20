module.exports = function (sequelize, DataTypes) {
  var friends = sequelize.define("friends", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    friendId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return friends;
};
