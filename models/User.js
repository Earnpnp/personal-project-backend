const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },

      profilePic: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("Admin", "User"),
        defaultValue: "User",
      },
    },
    {
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Cart, {
      foreignKey: {
        name: "userId",
        // allowNull: false,
      },
    });
  };

  return User;
};
