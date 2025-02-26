import { DataTypes } from "sequelize";
import db from "../config/connection.js";

const Product = db.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull : false
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    rating: {
      type: DataTypes.STRING,
    },
    image : {
      type : DataTypes.STRING
    }
  },
  {
    tableName: "Product",
  }
);

export default Product;
