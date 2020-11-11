module.exports = function (sequelize, DataTypes) {
    var Bookmarks = sequelize.define('Bookmarks', {
      tripName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    });
  
    return Bookmarks;
  };