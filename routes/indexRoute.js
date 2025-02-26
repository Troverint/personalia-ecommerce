import express from "express"
import { checkDBConnection } from "../config/connection.js"
const indexRouter = express.Router()

indexRouter.get('/',async (req,res) =>{
   const dbStatus = await checkDBConnection()
   if (dbStatus.status) {
    res.status(200).json({
        code : 200,
        message : "success",
        data : {
            message : "system is healthy"
        }
    })
   }else{
    res.status(500).json({
        code : 500,
        message : "failed",
        error : dbStatus.error,
        data : {
            error : dbStatus.error
        }
    })
   }
   
   
})



export default indexRouter