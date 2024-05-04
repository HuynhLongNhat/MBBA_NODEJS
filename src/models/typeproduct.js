'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class typeProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      typeProduct.hasMany(models.product, {
        foreignKey: "type_id",
        as: "typeProductData",
      })
    }
  };
  typeProduct.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'typeProduct',
  });
  return typeProduct;
};