import mongoose from "mongoose";
import products from "./data.js";
import productModel from "../models/productModel.js";


const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb+srv://shopstar:database8912@cluster0.yryuvwf.mongodb.net/shopstar");

    await productModel.deleteMany();
    console.log("Products are deleted");

    await productModel.insertMany(products);
    console.log("Products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    console.log(error);
    
    process.exit();
  }
};

seedProducts();