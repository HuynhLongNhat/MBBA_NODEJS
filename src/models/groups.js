'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      groups.hasMany(models.user);
      groups.belongsToMany(models.roles, { through: "Group_Role", foreignKey: 'groupId' });
    }
  };
  groups.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'groups',
  });
  return groups;
};