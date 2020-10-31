module.exports = function (sequelize, DataTypes) {
    var Bookmarks = sequelize.define('Bookmarks', {
      bookmarkOne: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      bookmarkTwo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      bookmarkThree: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      bookmarkFour: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    });
  
    Bookmarks.associate = function (models) {
      Bookmarks.hasMany(models.User, {
        onDelete: 'cascade',
      });
    };
  
    return Bookmarks;
  };