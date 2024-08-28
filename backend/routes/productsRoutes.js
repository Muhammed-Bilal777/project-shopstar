import express from "express";
import {  createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct   } from "../controllers/productsController.js";

const router = express.Router();

router.route("/products/").get(getAllProducts)
router.route("/admin/products").post(createProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/admin/products/:id").put(updateProduct)
router.route("/admin/products/:id").delete(deleteProduct)
 
export default router;