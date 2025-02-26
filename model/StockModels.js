import { DataTypes } from "sequelize";
import db from "../config/connection.js";

const Stock = db.define(
  "Stock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    terjual: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Stock",
  }
);

export default Stock;
