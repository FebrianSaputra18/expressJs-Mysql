const sequelize = require("../../config/sequelize");
const { Sequelize, DataTypes } = require("sequelize");

const Product = sequelize.define(
  "Product",
  {
    // Model attributes are defined here
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Product
