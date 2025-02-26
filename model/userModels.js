import { DataTypes } from "sequelize";
import db from "../config/connection.js";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role : {
      type : DataTypes.STRING,
      allowNull: false,

    },
    balance: {
      type: DataTypes.INTEGER,

    },
    total_cart:{
      type : DataTypes.INTEGER,
    },
   
    pfp : {
      type: DataTypes.STRING,

    },
  },
  {
    tableName: "User",
  }
);

export default User;
