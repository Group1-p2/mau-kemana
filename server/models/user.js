"use strict";
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Email should be filled"
        },
        notEmpty: {
          msg: "Email should be filled"
        },
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Password should be filled"
        },
        notEmpty: {
          msg: "Password should be fiiled"
        },
      },
      allowNull: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    sequelize,
  });

  User.addHook("beforeCreate", (user, options) => {
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};