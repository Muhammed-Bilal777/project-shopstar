import express from "express"
import dotenv from 'dotenv'



dotenv.config({path:"backend/config/config.env"})
const server = express();

server.get("/test",(req,res)=>{
    res.send("testing")
})

server.listen(process.env.PORT,()=>{
    console.log(`server is up and running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    
})