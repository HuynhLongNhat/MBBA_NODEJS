'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.typeProduct, {
        foreignKey: "type_id",
        as: "typeProductData"
      })
    }
  };
  product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    type_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};