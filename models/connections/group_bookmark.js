const bookmark = require("../bookmark");

module.exports = function (sequelize, DataTypes) {
  var group_bookmark = sequelize.define("group_bookmark", {
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookmarkId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return group_bookmark;
};
