import * as productService from '../services/product.service.mjs'
import httpStatus from 'http-status';
/**
 * Search products by name(controller for getProductsById)
 * @param {string} name - The name or part of the name to search for
 * @returns {Promise<Array>} - An array of products with names containing the search query
 */

const searchProductsByName = async (req, res) => {
  try {
    const query = req.query.query; // Assuming the search term is passed in the query parameter
    const products = await productService.getProductsByName(query);
    res.json(products);
  } catch (error) {
    console.error('Error searching products by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Controller function to get products by category with partial matching
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const searchProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    const products = await productService.getProductsByCategory(category);
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to search products by Last_day_updated
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const searchProductsByLastDayUpdated = async (req, res, next) => {
  try {
    const { lastDayUpdated } = req.query;
    const products = await productService.getProductsByLastDayUpdated(lastDayUpdated);
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    next(error);
  }
};
/**
 * Controller function to get featured products
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const fetchFeaturedProducts = async (req, res, next) => {
  try {
    // Retrieve featured products
    const featuredProducts = await productService.getFeaturedProducts();
    res.status(httpStatus.OK).json(featuredProducts);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to search products by model with partial matching
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>}
 */
const searchProductsByModel = async (req, res, next) => {
  try {
    const { model } = req.params;

    // Call the service function to search products by model with partial matching
    const products = await productService.getProductsByModel(model);

    // Respond with the retrieved products
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};
/**
 * Controller function to search products by year introduced with partial matching
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {Promise<void>}
 */
const searchProductsByYearIntroduced = async (req, res, next) => {
  try {
    const { year } = req.params;

    // Call the service function to search products by year introduced with partial matching
    const products = await productService.getProductsByYearIntroduced(year);

    // Respond with the retrieved products
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};

/**
 * Controller function to create a new product
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const createProductHandler = async (req, res, next) => {
  try {
    
    const product = await productService.createProduct(req.body);
    res.status(httpStatus.CREATED).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update a product by its ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const updateProductByIdHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.updateProductById(productId, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete a product by its ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const deleteProductByIdHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.deleteProductById(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get a product by its ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const getProductByIdHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function for calculating the number of out of stock products
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @param {import('express').NextFunction} next - The next middleware function
 */
const calculateOutOfStockProductsHandler = async (req, res, next) => {
  try {
      const outOfStockProductsCount = await productService.calculateOutOfStockProducts();
      res.status(httpStatus.OK).json({ outOfStockProductsCount });
  } catch (error) {
      next(error);
  }
};

/**
* Handler function for checking if a product is out of stock
* @param {import('express').Request} req - The request object
* @param {import('express').Response} res - The response object
* @param {import('express').NextFunction} next - The next middleware function
*/
const isProductOutOfStockHandler = async (req, res, next) => {
  try {
      const { productId } = req.params;
      const isOutOfStock = await productService.isProductOutOfStock(productId);
      res.status(httpStatus.OK).json({ isOutOfStock });
  } catch (error) {
      next(error);
  }
};

/**
* Controller function for setting product display period
* @param {import('express').Request} req - The request object
* @param {import('express').Response} res - The response object
* @param {import('express').NextFunction} next - The next middleware function
*/
const setProductDisplayPeriodHandler = async (req, res, next) => {
  try {
      const { productId } = req.params;
      const { startTime, endTime } = req.body;
      const updatedProduct = await productService.setProductDisplayPeriod(productId, startTime, endTime);
      res.status(httpStatus.OK).json(updatedProduct);
  } catch (error) {
      next(error);
  }
};

/**
* Controller function for selecting a hero product
* @param {import('express').Request} req - The request object
* @param {import('express').Response} res - The response object
* @param {import('express').NextFunction} next - The next middleware function
*/
const selectHeroProductHandler = async (req, res, next) => {
  try {
      const { productId } = req.params;
      const updatedProduct = await productService.selectHeroProduct(productId);
      res.status(httpStatus.OK).json(updatedProduct);
  } catch (error) {
      next(error);
  }
};

/**
* Controller function for getting the amount of a particular product left by ID
* @param {import('express').Request} req - The request object
* @param {import('express').Response} res - The response object
* @param {import('express').NextFunction} next - The next middleware function
*/
const getProductAmountLeftByIdHandler = async (req, res, next) => {
  try {
      const { productId } = req.params;
      const amountLeft = await productService.getProductAmountLeftById(productId);
      res.status(httpStatus.OK).json({ amountLeft });
  } catch (error) {
      next(error);
  }
};

/**
 * Controller function for getting the amount of a particular product left by Product ID and Model
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @param {import('express').NextFunction} next - The next middleware function
 */
const getProductAmountLeftByModelHandler = async (req, res, next) => {
  try {
      const { productId, model } = req.params;
      const amountLeft = await productService.getProductAmountLeftByModel(productId, model);
      res.status(httpStatus.OK).json({ amountLeft });
  } catch (error) {
      next(error);
  }
};

/**
* Controller function for getting product amount left by product ID and color
* @param {import('express').Request} req - The request object
* @param {import('express').Response} res - The response object
* @param {import('express').NextFunction} next - The next middleware function
*/
const getProductAmountLeftByProductIdAndColorHandler = async (req, res, next) => {
  try {
      const { productId, color } = req.params;
      const amountLeft = await productService.getProductAmountLeftByProductIdAndColor(productId, color);
      res.status(httpStatus.OK).json({ amountLeft });
  } catch (error) {
      next(error);
  }
};

/**
* Controller function for counting the total number of products
* @param {import('express').Request} req - The request object
* @param {import('express').Response} res - The response object
* @param {import('express').NextFunction} next - The next middleware function
*/
const countProductsController = async (req, res, next) => {
  try {
      const totalCount = await productService.countProducts();
      res.status(httpStatus.OK).json({ totalCount });
  } catch (error) {
      next(error);
  }
};
/**
 * Controller function for getting all products
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @param {import('express').NextFunction} next - The next middleware function
 */
const getAllProductsController = async (req, res, next) => {
  try {
      const products = await productService.getAllProducts();
      res.status(httpStatus.OK).json(products);
  } catch (error) {
      next(error);
  }
};


export {
    searchProductsByName,
    searchProductsByCategory,
    searchProductsByLastDayUpdated,
    fetchFeaturedProducts,
    searchProductsByModel,
    searchProductsByYearIntroduced,
    createProductHandler,
    updateProductByIdHandler,
    deleteProductByIdHandler,
    getProductByIdHandler,
    calculateOutOfStockProductsHandler,
    isProductOutOfStockHandler,
    setProductDisplayPeriodHandler,
    selectHeroProductHandler,
    getProductAmountLeftByIdHandler,
    getProductAmountLeftByModelHandler,
    getProductAmountLeftByProductIdAndColorHandler,
    countProductsController,
    getAllProductsController
  };