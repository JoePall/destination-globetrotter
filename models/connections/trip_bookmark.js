module.exports = function (sequelize, DataTypes) {
  var trip_bookmark = sequelize.define("trip_bookmark", {
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookmarkId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return trip_bookmark;
};
