import catchAsync from "../middlewares/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from '../models/productModel.js'




// get all Product   =>  /api/v1/products
export const getAllProducts=catchAsync(async (req,res,next)=>{
  const { skip, limit, minPrice, maxPrice } = req.query;

  let filter = {};

  if (minPrice) {
    filter.price = { $lte: parseInt(minPrice) };
  }

  if (maxPrice) {
     
      filter.price = { $gte: parseInt(maxPrice) };
    }  
  
3
  if (minPrice && maxPrice) {
    filter.price = { $lte: parseInt(minPrice), $gte: parseInt(maxPrice) };
  }

  let products = await Product.find(filter).sort({ price: 1 }).limit(parseInt(limit)).skip(parseInt(skip));

  if (!products) {
    return next(new ErrorHandler("products not found", 401));
  }

  res.status(200).send({
    message: "All products",
    totalProducts: products.length,
    skip,
    limit,
    products,
  });
})

// create new  Product   =>  /api/v1/admin/products/

export const createProduct=catchAsync(async(req,res,next)=>{
    
     
    try { 
        let newproduct = await Product.create(req.body)
        res.status(200).send({
            message:"succesfully created",
            newproduct
        })
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(`Error : ${error}`, 401))
        
    }
})



// getting single  Product   =>  /api/v1/admin/products/:id
export const getProductDetails =catchAsync(async (req,res,next)=>{
 
  try {
    let product = await Product.findById(req.params.id)
     if(!product){
      return next(new ErrorHandler("product not found", 401))
     }
    res.status(200).json({
      product
    })
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 401))
    
  }
   

})


// updating product  Product   =>  /api/v1/admin/products/:id
export const updateProduct=catchAsync(async (req,res,next)=>{
  try {

    let product = await Product.findById(req.params.id);
    if(!product){
      return next(new ErrorHandler("product not found", 401))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
     
    res.status(200).json({
      message : "Product updated successfully",
      product
    })
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("product not found", 401))
  }
})



// deleting product  Product   =>  /api/v1/admin/products/:id


export const deleteProduct = catchAsync(async (req,res,next)=>{
  let product = await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler("product not found", 401))
  }

  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message:"product deleted successfullt",
    product,
  })
})