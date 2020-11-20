module.exports = function (sequelize, DataTypes) {
  var trip_message = sequelize.define("trip_message", {
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return trip_message;
};
