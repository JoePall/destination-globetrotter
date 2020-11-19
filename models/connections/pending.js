module.exports = function (sequelize, DataTypes) {
  var pending = sequelize.define("pending", {
    userAId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userBId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return pending;
};
