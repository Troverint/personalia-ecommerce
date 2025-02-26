import { DataTypes } from "sequelize";
import db from "../config/connection.js";

const Cart = db.define("Cart",{
    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
    },
    harga_total :{
        type : DataTypes.INTEGER
    },quantity :{
        type : DataTypes.INTEGER

    },size:{
        type : DataTypes.STRING

    }
},{
    tableName : "Cart"
}
)

export default Cart