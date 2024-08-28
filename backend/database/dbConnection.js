import mongoose from "mongoose";


const connectDatabase = async ()=>{
  try {
      
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("shutting down due to database connection error");
    
    process.exit(1)
  }
}


export default connectDatabase;