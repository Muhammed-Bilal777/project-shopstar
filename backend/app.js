import express from "express"
import dotenv from 'dotenv'


//importing Routes
import productRoutes from "./routes/productsRoutes.js"
import errorMiddleware  from "./middlewares/errors.js";
import connectDatabase from "./database/dbConnection.js";




//file configration
dotenv.config({path:"backend/config/config.env"})


const server = express();
server.use(express.json())



//databse connection
connectDatabase();


//routes
server.use("/api/v1",productRoutes)



 

//middlewares
server.use(errorMiddleware)


server.listen(process.env.PORT,()=>{
    console.log(`server is up and running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    
})