module.exports = function (sequelize, DataTypes) {
  var message_group = sequelize.define("message_group", {
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    messageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return message_group;
};
