import express from 'express';
import * as ProductController from '../../controllers/product.controller.mjs';
import validate from '../../middlewares/validate.mjs';
import {ProductValidation} from '../../validations/index.mjs' 
import { updateProductByIdValidation } from '../../validations/product.validation.mjs';
const productRouter = express.Router();

// Search products by name
productRouter.get('/search/name', /*validate(searchProductsByNameValidation),*/ ProductController.searchProductsByName);

// Search products by category
productRouter.get('/search/category'/*, validate(searchProductsByCategoryValidation) */, ProductController.searchProductsByCategory);

// Search products by Last_day_updated
productRouter.get('/search/last-day-updated'/** , validate(searchProductsByLastDayUpdatedValidation)*/, ProductController.searchProductsByLastDayUpdated);

// Fetch featured products
productRouter.get('/featured', ProductController.fetchFeaturedProducts);

// Search products by model
productRouter.get('/search/model', /**validate(searchProductsByModelValidation), */ ProductController.searchProductsByModel);

// Search products by year introduced
productRouter.get('/search/year-introduced/:year', /**validate(searchProductsByYearIntroducedValidation), */ ProductController.searchProductsByYearIntroduced);

// Create product
productRouter.post('/',validate(ProductValidation.createProductValidation), ProductController.createProductHandler);

// Update product by ID
productRouter.put('/:productId', validate(ProductValidation.updateProductByIdValidation), ProductController.updateProductByIdHandler);

// Delete product by ID
productRouter.delete('/:productId', /**validate(deleteProductByIdValidation), */ ProductController.deleteProductByIdHandler);

// Get product by ID
productRouter.get('/:productId', validate(ProductValidation.getProductByIdValidation),ProductController.getProductByIdHandler);

// Calculate out of stock products
productRouter.get('/your-out-of-stock/not-available', ProductController.calculateOutOfStockProductsHandler);

// Check if product is out of stock by ID
productRouter.get('/:productId/out-of-stock', /**validate(getProductAmountLeftByIdValidation), */ ProductController.isProductOutOfStockHandler);

// Set product display period################### Not yet implemented
productRouter.put('/:productId/display-period', /**validate(setProductDisplayPeriodValidation) ,*/ ProductController.setProductDisplayPeriodHandler);

// Select hero product
productRouter.put('/:productId/select-hero', ProductController.selectHeroProductHandler);

// Get product amount left by ID
productRouter.get('/:productId/amount-left', /**validate(getProductAmountLeftByIdValidation), */ ProductController.getProductAmountLeftByIdHandler);

// Get product amount left by model
productRouter.get('/:productId/amount-left-by-model/:model',/**validate(getProductAmountLeftByModelValidation),  */ ProductController.getProductAmountLeftByModelHandler);

// Get product amount left by product ID and color
productRouter.get('/:productId/amount-left-by-color/:color', /**validate(getProductAmountLeftByProductIdAndColorValidation), */ ProductController.getProductAmountLeftByProductIdAndColorHandler);

// Count products
productRouter.get('/count/total', ProductController.countProductsController);

// Get all products
productRouter.get('/', ProductController.getAllProductsController);

export default productRouter;
