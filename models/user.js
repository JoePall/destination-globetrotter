var bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5],
      },
    },
  });

  // Compare hashed and unhashed passwords
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  // Hash the password
  User.addHook('beforeCreate', function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = function (models) {
    User.hasMany(models.Groups, {
      onDelete: 'cascade',
    });
  };

  return User;
};
