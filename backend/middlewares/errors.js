

export default (err,req,res,next)=>{

  let error ={
    message :err.message || "internal server error",
    statusCode : err.statusCode || 500,
  }

 

  if(process.env.NODE_ENV === "DEVELOPMENT"){
    res.status(error.statusCode).json({
        message : error.message,
        error :err,
        stack :err.stack
    })
  }

  if(process.env.NODE_ENV === "PRODUCTION"){
    res.status(error.statusCode).json({
        message:error.message
    })
  }

}