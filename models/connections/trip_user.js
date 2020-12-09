module.exports = function (sequelize, DataTypes) {
  var trip_user = sequelize.define("trip_user", {
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return trip_user;
};
