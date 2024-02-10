import express from 'express';
import ProductController from '../../controllers/product.controller.mjs';
const productRouter = express.Router();

// Example: Get all products
productRouter.get('/RetrieveProducts/all', ProductController.getAllProducts);
productRouter.get('/RetrieveProducts?:id',ProductController.getProductById);

// Example: Create a new product
productRouter.post('/addProduct', ProductController.createProduct);

// Add other routes for CRUD operations as needed

export default productRouter;
