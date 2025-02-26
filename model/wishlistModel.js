import { DataTypes } from "sequelize";
import db from "../config/connection.js";

const Wishlist = db.define(
    "Wishlist",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    },
    {
        tableName: "Wishlist",
    }
)

export default Wishlist;