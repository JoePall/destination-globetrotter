module.exports = function (sequelize, DataTypes) {
  var Bookmarks = sequelize.define("Bookmarks", {
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("data"));
      },
      set: function (value) {
        console.log("value from bookmarks.js = ", value);
        this.setDataValue("data", JSON.stringify(value));
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Bookmarks;
};
