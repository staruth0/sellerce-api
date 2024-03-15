import Promotion from '../models/promotion.model.mjs';
import {BaseProduct as Product} from '../models/product.model.mjs'
import ApiError from '../utils/ApiError.mjs';
import httpStatus from 'http-status';
import logger from '../config/logger.mjs';


/**
 * Create a new promotion.
 * @param {Object} promotionData - Data for the new promotion.
 * @returns {Promise<Object>} Created promotion.
 */
const createPromotion = async (promotionData) => {
    try {
        // Extract product IDs from promotion data
        const productIds = promotionData.product_ids;

        // Check if all product IDs exist in the products collection
        const existingProducts = await Product.find({ product_id: { $in: productIds } });

        // Check if all product IDs exist
        if (existingProducts.length !== productIds.length) {
            // Get the IDs of non-existing products
            const nonExistingProductIds = productIds.filter(productId => !existingProducts.find(product => product.product_id === productId));

            // Throw error for non-existing products
            throw new ApiError(httpStatus.BAD_REQUEST, `Products not found: ${nonExistingProductIds}`);
        }
        // Check if the promotion_id is unique
        const existingPromotion = await Promotion.findOne({ promotion_id: promotionData.promotion_id });
        if (existingPromotion) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Promotion with ID ${promotionData.promotion_id} already exists`);
        }
        // All product IDs exist, create the promotion
        const newPromotion = await Promotion.create(promotionData);
        return newPromotion;
    } catch (error) {
        // Log the error
        logger.error(error);
        // Rethrow the error
        throw error;
    }
};


/**
 * Update an existing promotion.
 * @param {string} promotionId - ID of the promotion to update.
 * @param {Object} updatedData - Updated data for the promotion.
 * @returns {Promise<Object>} Updated promotion.
 */
async function updatePromotion(promotionId, updatedData) {
  
    const updatedPromotion = await Promotion.findOneAndUpdate({promotion_id:promotionId}, updatedData, { new: true });
    if (!updatedPromotion) {
      throw new ApiError(httpStatus.NOT_FOUND, `Promotion with ID ${promotionId} not found`);
    }
    return updatedPromotion;
}

/**
 * Cancel an ongoing promotion.
 * @param {string} promotionId - ID of the promotion to cancel.
 * @returns {Promise<Object>} Cancelled promotion.
 */
async function cancelPromotion(promotionId) {
  try {
    const cancelledPromotion = await Promotion.findOneAndUpdate({promotion_id:promotionId}, { end_date: Date.now() }, { new: true });
    if (!cancelledPromotion) {
      throw new Error('Promotion not found');
    }
    return cancelledPromotion;
  } catch (error) {
    throw new Error('Failed to cancel promotion');
  }
}

/**
 * Retrieve all current promotions.
 * @returns {Promise<Array>} Array of promotions.
 */
async function getAllPromotions() {
  try {
    const promotions = await Promotion.find({ end_date: { $gte: new Date() } });
    return promotions;
  } catch (error) {
    throw new Error('Failed to retrieve promotions');
  }
}

/**
 * Retrieve the latest promotion.
 * @returns {Promise<Object|null>} Latest promotion or null if none found.
 */
async function getLatestPromotion() {
  try {
    const latestPromotion = await Promotion.findOne({ end_date: { $gte: new Date() } }).sort({ start_date: -1 });
    return latestPromotion;
  } catch (error) {
    throw new Error('Failed to retrieve latest promotion');
  }
}

/**
 * Retrieve a particular promotion by ID.
 * @param {string} promotionId - ID of the promotion to retrieve.
 * @returns {Promise<Object|null>} Retrieved promotion or null if not found.
 */
async function getPromotionById(promotionId) {
  try {
    const promotion = await Promotion.findOne({promotion_id:promotionId});
    return promotion;
  } catch (error) {
    throw new Error('Failed to retrieve promotion');
  }
}

export { createPromotion, updatePromotion, cancelPromotion, getAllPromotions, getLatestPromotion, getPromotionById };
