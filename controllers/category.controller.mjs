import * as categoryService from '../services/category.service.mjs';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.mjs';
import Category from '../models/category.model.mjs';

/**
 * Controller function to create a new category.
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(httpStatus.CREATED).json(category);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller function to get a category by ID.
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const getCategoryById = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategoryById(categoryId);
        res.status(httpStatus.OK).json(category);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller function to update a category.
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
        res.status(httpStatus.OK).json(updatedCategory);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller function to get all categories.
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(httpStatus.OK).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch categories'));
  }
};


/**
 * Controller function to delete a category.
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        await categoryService.deleteCategory(categoryId);
        res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};

export {
    createCategory,
    getCategoryById,
    updateCategory,
    getAllCategories,
    deleteCategory
};
