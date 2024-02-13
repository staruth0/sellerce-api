import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.mjs';
import {BaseProduct, ApplePhone, AppleWatch, AppleTablet, AppleLaptop}  from '../models/product.model.mjs';
import {toSingular} from '../utils/helperFunctions.mjs'
// import { BaseProduct } from '../models/product.model.mjs';

/**
 * Get the corresponding model based on the product category
 * @param {string} category - The category of the product
 * @returns {Model} - The Mongoose model corresponding to the category
 */
const getCategoryModel = (category) => {
    switch (category) {
        case 'phone':
            return ApplePhone;
        case 'watch':
            return AppleWatch;
        case 'tablet':
            return AppleTablet;
        case 'laptop':
            return AppleLaptop;
        default:
            return BaseProduct; // Default to BaseProduct if no specific category is provided
    }
};

/**
 * Create a new product
 * @param {object} productBody - The body of the product to create
 * @returns {Promise<object>} - The created product
 */
const createProduct = async (productBody) => {
    try {
        const { category, ...productData } = productBody;
        const ProductModel = getCategoryModel(category);
        const product = new ProductModel(productData);
        const savedProduct = await product.save();
        if (!savedProduct) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create product');
        }
        return savedProduct;
    } catch (error) {
        console.error(`Error creating product: ${error}`);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create product');
    }
};

/**
 * Update a product by its ID
 * @param {string} productId - The ID of the product to update
 * @param {object} updateBody - The body containing the updates
 * @returns {Promise<object>} - The updated product
 */
const updateProductById = async (productId, updateBody) => {
    try {
        // Retrieve the product by its ID
        const product = await getProductById(productId);

        // Check if the product exists
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${productId} not found`);
        }

        // Apply updates from updateBody to the product
        Object.assign(product, updateBody);

        // Save the updated product
        await product.save();

        // Return the updated product
        return product;
    } catch (error) {
        // If an error occurs during the update process, throw it
        throw error;
    }
};

/**
 * Delete a product by its ID
 * @param {string} productId - The ID of the product to delete
 * @returns {Promise<object>} - The deleted product
 */
const deleteProductById = async (productId) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${productId} not found`);
    }
    await product.remove();
    return product;
};

/**
 * Get a product by its ID
 * @param {string} id - The ID of the product to retrieve
 * @returns {Promise<object>} - The retrieved product
 */
const getProductById = async (id) => {
    try {
        
        const filter= {
            product_id:id
        }
        const product = await BaseProduct.findOne(filter);
        return product;
    } catch (error) {
        console.error(`Error getting product by ID: ${error}`);
        throw new ApiError(httpStatus.NOT_FOUND, 'Error Getting the product');
    }
};

//**************************************************************** */

/**
 * Calculate the number of out of stock products
 * @returns {Promise<number>} - The number of out of stock products
 * @throws {ApiError} - If there is an error calculating the number of out of stock products
 */
const calculateOutOfStockProducts = async () => {
    try {
        const outOfStockProductsCount = await BaseProduct.countDocuments({ quantity_in_stock: 0 });
        return outOfStockProductsCount;
    } catch (error) {
        console.error(`Error calculating number of out of stock products: ${error}`);
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Failed to calculate number of out of stock products: ${error.message}`
        );
    }
};

/**
 * Check if a product is out of stock
 * @param {string} productId - The ID of the product
 * @returns {Promise<boolean>} - A boolean indicating if the product is out of stock
 * @throws {ApiError} - If there is an error checking the product's stock status
 */
const isProductOutOfStock = async (productId) => {
   try {
       const product = await getProductById(productId);
       return !product || product.quantity_in_stock === 0;
   } catch (error) {
       console.error(`Error checking if product is out of stock: ${error}`);
       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to check if product is out of stock: ${error.message}`);
   }
};

/**
 * Set/update the time period for a product to be displayed in the hero section
 * @param {ObjectId} productId - The ID of the product
 * @param {Date} startTime - The start time of the display period
 * @param {Date} endTime - The end time of the display period
 * @returns {Promise<Product>} - The updated product
 * @throws {ApiError} - If there is an error setting the product's display period
 */
const setProductDisplayPeriod = async (productId, startTime, endTime) => {
   try {
       const product = await getProductById(productId);
       product.featured.startTime = startTime;
       product.featured.endTime = endTime;
       await product.save();
       return product;
   } catch (error) {
       console.error(`Error setting product display period: ${error}`);
       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to set product display period: ${error.message}`);
   }
};

/**
 * Select a product to be displayed at the hero section
 * @param {ObjectId} productId - The ID of the product to select
 * @returns {Promise<Product>} - The updated product
 * @throws {ApiError} - If there is an error selecting the hero product
 */
const selectHeroProduct = async (productId) => {
   try {
       const product = await getProductById(productId);
       product.featured.hero_display.answer = true;
       await product.save();
       return product;
   } catch (error) {
       console.error(`Error selecting hero product: ${error}`);
       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to select hero product: ${error.message}`);
   }
};

/**
 * Get the amount of a particular product left by ID
 * @param {string} productId - The ID of the product
 * @returns {Promise<number>} - The amount of the product left
 * @throws {ApiError} - If there is an error getting the product's amount left
 */
const getProductAmountLeftById = async (productId) => {
    try {
        // Retrieve the product by its ID using getProductById function
        const product = await getProductById(productId);

        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${productId} not found`);
        }

        // Check if quantity_in_stock is present and non-negative
        if (product.quantity_in_stock === undefined || product.quantity_in_stock < 0) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Quantity information is missing or invalid for product with ID ${productId}`);
        }

        // Using the total quantity directly from the product's quantity_in_stock attribute
        const totalQuantity = product.quantity_in_stock;

        return totalQuantity;
    } catch (error) {
        console.error(`Error getting product amount left by ID: ${error.message}`);
        if (error instanceof ApiError) {
            throw error; // Re-throw ApiError
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to get product amount left by ID: ${error.message}`);
        }
    }
};

//************************************************************************ */
/**
 * Get the amount of a particular product left by Product ID and Model
 * @param {string} productId - The ID of the product
 * @param {string} model - The model of the product
 * @returns {Promise<number>} - The amount of the product left
 */
const getProductAmountLeftByModel = async (productId, model) => {
    try {
        // Retrieve the product by its ID using getProductById function
        const product = await getProductById(productId);

        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${productId} not found`);
        }
        // Find the variant with the specified model
        const variant = product.variants.find(v => v.model === model);

        if (!variant) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product variant with model ${model} not found`);
        }

        // Check if quantity_in_stock is present and non-negative
        if (variant.model_quantity_in_stock === undefined || variant.model_quantity_in_stock < 0) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Quantity information is missing or invalid for product variant with model ${model}`);
        }

        // Using the total quantity directly from the variant's model_quantity_in_stock attribute
        const totalQuantity = variant.model_quantity_in_stock;

        return totalQuantity;
    } catch (error) {
        console.error(`Error getting product amount left by model: ${error.message}`);
        if (error instanceof ApiError) {
            throw error; // Re-throw ApiError
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to get product amount left by model: ${error.message}`);
        }
    }
};
 
  
 /**
 * Get product amount left by product ID and color
 * @param {string} productId - Product ID
 * @param {string} color - Product color
 * @returns {Promise<number>} - Amount of the product left for the specified product ID and color
 */
 const getProductAmountLeftByProductIdAndColor = async (productId, color) => {
    try {
        // Find the product by product ID
        const product = await getProductById(productId);

        // If the product is not found, return 0 quantity left
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${productId} not found`);
        }

        // Find the variant with the specified color
        const variant = product.variants.find((v) => v.otherVariant.some((ov) => ov.color === color));

        // If the variant is not found, return 0 quantity left
        if (!variant) {
            throw new ApiError(httpStatus.NOT_FOUND, `Product variant with color ${color} not found`);
        }

        // Find the specific color variant
        const colorVariant = variant.otherVariant.find((ov) => ov.color === color);

        // Return the quantity in stock for the specified color
        return colorVariant.color_quantity_in_stock || 0;
    } catch (error) {
        console.error(`Error getting product amount left by product ID and color: ${error}`);
        throw new Error(`Failed to get product amount left by product ID and color: ${error.message}`);
    }
};

  /**
 * Count the total number of products
 * @returns {Promise<number>} - The total number of products
 */
const countProducts = async () => {
    try {
        // Retrieve all products
        const products = await getAllProducts();

        // If there are no products, return 0
        if (!products || products.length === 0) {
            return 0;
        }

        // Count the total number of products
        const totalCount = products.length;

        return totalCount;
    } catch (error) {
        console.error(`Error counting products: ${error.message}`);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to count products: ${error.message}`);
    }
};
  
/**
 * Get products by category with partial matching
 * @param {string} category - The category of products to retrieve (partial match)
 * @returns {Promise<Array>} - An array of products matching the partial category
 * @throws {ApiError} - If there is an error retrieving products
 */
const getProductsByCategory = async (category) => {
    try {
      // Create a regular expression to match partially
      const regex = new RegExp(category, 'i');
      console.log('################### regex: ', regex, ' category: ', category )
      // Retrieve products by category from the database with partial match
      const products = await BaseProduct.find({ category: regex });
    
      // Return the retrieved products
      return products;
    } catch (error) {
      // Handle any errors
      console.error('Error retrieving products by category:', error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve products by category');
    }
  };
  
/**
 * Get products by name or partial name
 * @param {string} name - The name or partial name of products to retrieve
 * @returns {Promise<Array>} - An array of products matching the specified name or partial name
 */
const getProductsByName = async (name) => {
    try {
        // Query the database for products with matching names
        
        const products = await BaseProduct.find({ name: { $regex: new RegExp(name, 'i') } });

        return products;
    } catch (error) {
        console.error(`Error retrieving products by name: ${error.message}`);
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Failed to retrieve products by name: ${error.message}`
        );
    }
};

/**
 * Get products by Last_day_updated with partial or complete matching
 * @param {string} lastDayUpdated - The Last_day_updated value to search for
 * @returns {Promise<Array>} - An array of products matching the Last_day_updated
 * @throws {ApiError} - If there is an error retrieving products
 */
const getProductsByLastDayUpdated = async (lastDayUpdated) => {
    try {
        // Convert the lastDayUpdated parameter to a Date object
        const lastDayUpdatedDate = new Date(lastDayUpdated);

        // Calculate the next day to include all dates for the given day
        const nextDay = new Date(lastDayUpdatedDate);
        nextDay.setDate(lastDayUpdatedDate.getDate() + 1);

        // Retrieve products with Last_day_updated falling within the specified date range
        const products = await BaseProduct.find({
            Last_day_updated: {
                $gte: lastDayUpdatedDate,  // Greater than or equal to the specified date
                $lt: nextDay  // Less than the next day to include all dates for the given day
            }
        });

        // Return the retrieved products
        return products;
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving products by Last_day_updated:', error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve products by Last_day_updated');
    }
};


/************************************************************************ */

/**
 * Service function to get featured products
 * @returns {Promise<Array>} - An array of featured products
 * @throws {ApiError} - If there is an error retrieving featured products
 */
const getFeaturedProducts = async () => {
  try {
    // Retrieve featured products from the database
    const featuredProducts = await BaseProduct.find({ 'featured.answer': true });
    return featuredProducts;
  } catch (error) {
    console.error('Error retrieving featured products:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve featured products');
  }
};

/**
 * Service function to get products by model with partial matching
 * @param {string} model - The model of the product to retrieve (partial match)
 * @returns {Promise<Array>} - An array of products matching the partial model
 * @throws {ApiError} - If there is an error retrieving products
 */
const getProductsByModel = async (model) => {
    try {
      // Create a regular expression to match partially
      const regex = new RegExp(model, 'i');
  
      // Retrieve products by model from the database with partial match
      const products = await BaseProduct.find({ 'variants.model': regex });
      return products;
    } catch (error) {
      console.error('Error retrieving products by model:', error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve products by model');
    }
  };  

  /**
 * Get products by year introduced with partial matching
 * @param {string} year - The year of product introduction to search for (partial match)
 * @returns {Promise<Array>} - An array of products matching the partial year introduced
 * @throws {ApiError} - If there is an error retrieving products
 */
const getProductsByYearIntroduced = async (year) => {
    try {
      // Create a regular expression to match partially
      const regex = new RegExp(year, 'i');
      // Retrieve products by year introduced from the database with partial match
      const products = await BaseProduct.find({ 'variants.year_introduced': regex });
      // Return the retrieved products
      return products;
    } catch (error) {
      // Handle any errors
      console.error('Error retrieving products by year introduced:', error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve products by year introduced');
    }
  };
  
  /**
    * Get all products
    * @returns {Promise<Product[]>} - All products
    */
const getAllProducts = async () => {
    return BaseProduct.find();
  };


export {
    createProduct,
    updateProductById,
    deleteProductById,
    getProductById,
    countProducts,
    isProductOutOfStock,
    setProductDisplayPeriod,
    selectHeroProduct,
    getProductsByCategory,
    getProductsByName,
    getProductsByLastDayUpdated,
    getFeaturedProducts,
    getProductsByModel,
    getProductsByYearIntroduced,
    getProductAmountLeftById,
    getProductAmountLeftByModel,
    getProductAmountLeftByProductIdAndColor,
    getAllProducts,
    calculateOutOfStockProducts,
};