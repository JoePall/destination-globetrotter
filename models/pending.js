module.exports = function (sequelize, DataTypes) {
  var pending = sequelize.define("pending", {
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    requestedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return pending;
};
