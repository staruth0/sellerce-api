import express from 'express';
import ProductController from '../controllers/productControllers.mjs';
const productRouter = express.Router();

// Example: Get all products
productRouter.get('/AllProducts', ProductController.getAllProducts);

// Example: Create a new product
productRouter.post('/addProduct', ProductController.createProduct);

// Add other routes for CRUD operations as needed

export default productRouter;
