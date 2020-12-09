module.exports = function (sequelize, DataTypes) {
  var group_trip = sequelize.define("group_trip", {
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return group_trip;
};
