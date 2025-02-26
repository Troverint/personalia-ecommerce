import { DataTypes } from "sequelize";
import db from "../config/connection.js";

const Category = db.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category_name : {
        type : DataTypes.STRING,
        allowNull : false
    }
  },
  {
    tableName: "Category",
  }
);

export default Category;
