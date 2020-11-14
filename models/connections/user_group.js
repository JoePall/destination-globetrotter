module.exports = function (sequelize, DataTypes) {
  var user_group = sequelize.define("user_group", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: sequelize.user,
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: sequelize.group,
        key: "id",
      },
    },
  });

  sequelize.group.belongsToMany(sequelize.user, { through: user_group });
  sequelize.user.belongsToMany(sequelize.group, { through: user_group });

  return user_group;
};
