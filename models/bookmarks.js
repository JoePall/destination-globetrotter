module.exports = function (sequelize, DataTypes) {
  var Bookmarks = sequelize.define("Bookmarks", {
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("value"));
      },
      set: function (value) {
        this.setDataValue("value", JSON.stringify(value));
      },
    },
  });

  return Bookmarks;
};
