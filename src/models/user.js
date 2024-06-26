'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.groups);
    }
  };
  user.init({
    name: DataTypes.STRING,

    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    groupId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};