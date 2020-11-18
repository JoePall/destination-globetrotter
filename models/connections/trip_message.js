module.exports = function (sequelize, DataTypes) {
  var trip_message = sequelize.define("trip_message", {
    tripId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    messageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return trip_message;
};
