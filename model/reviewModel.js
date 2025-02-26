import { DataTypes } from "sequelize";
import db from "../config/connection.js";


const Review = db.define("Review",{
    id:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    rating :{
        type : DataTypes.INTEGER
    },
    ulasan : {
        type : DataTypes.STRING
    }
},
{
    tableName : "Review"
})


export default Review
