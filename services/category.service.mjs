import httpStatus from 'http-status';
import Category from '../models/category.model.mjs';
import {BaseProduct as Product} from '../models/product.model.mjs';
import ApiError from '../utils/ApiError.mjs';

/**
 * Create a new category
 * @param {Object} categoryBody - Data for the new category.
 * @returns {Promise<Object>} Created category.
 */
const createCategory = async (categoryBody) => {
    // Check if categoryName is unique
    const existingCategory = await Category.findOne({ categoryName: categoryBody.categoryName });
    if (existingCategory) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Category name must be unique');
    }

    // Check if id is unique
    // const existingIdCategory = await Category.findOne({ id: categoryBody.id });
    // if (existingIdCategory) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'Category ID must be unique');
    // }
    try {
      const category = await Category.create(categoryBody);
      return category;
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create category');
    }
  };
  

/**
 * Get category by ID
 * @param {string} categoryId - ID of the category to retrieve.
 * @returns {Promise<Object>} Retrieved category.
 */
const getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    return category;
};

/**
 * Update an existing category
 * @param {string} categoryId - ID of the category to update.
 * @param {Object} updatedData - Updated data for the category.
 * @returns {Promise<Object>} Updated category.
 */
const updateCategory = async (categoryId, updatedData) => {

    const category = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });
    if (!category) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    return category;
};

/**
 * Get all categories.
 * @returns {Promise<Array>} Array of category objects.
 */
const getAllCategories = async () => {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  };

/**
 * Delete an existing category
 * @param {string} categoryId - ID of the category to delete.
 * @returns {Promise<void>}
 */
const deleteCategory = async (categoryId) => {

  // Find the category to be deleted
  const category = await Category.findById(categoryId);
  if (!category) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  
  // Delete products associated with the category
  const deleteresult = await Product.deleteMany({ category: category.categoryName });
  if (!(deleteresult==0)) {
    console.log(`${deleteresult} products will be deleted`);
  }
  try {
      // Delete the category itself
      await category.delete();
  } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete category');
  }
};

/**
 * Check if a category exists by categoryName (case-insensitive)
 * @param {string} categoryName - The name of the category to check
 * @returns {Promise<boolean>} - Whether the category exists or not
 */
const checkCategoryExists = async (categoryName) => {
    try {
        // Use a case-insensitive regular expression for the search
        const category = await Category.findOne({ categoryName: { $regex: new RegExp(`^${categoryName}$`, 'i') } });
        return !!category; // Returns true if category is found, false otherwise
    } catch (error) {
        console.error(`Error checking if category ${categoryName} exists: ${error}`);
        return false; // Return false in case of any error
    }
};

export {
  createCategory,
  getCategoryById,
  updateCategory,
  getAllCategories,
  deleteCategory,
  checkCategoryExists
};
