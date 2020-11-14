module.exports = function (sequelize, DataTypes) {
  var bookmark = sequelize.define("bookmark", {
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue("data"));
      },
      set: function (value) {
        console.log("value from bookmark.js = ", value);
        this.setDataValue("data", JSON.stringify(value));
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return bookmark;
};
