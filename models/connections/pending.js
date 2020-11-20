module.exports = function (sequelize, DataTypes) {
  var pending = sequelize.define("pending", {
    requesterId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestedId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return pending;
};
