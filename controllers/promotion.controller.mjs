import * as promotionService from '../services/promotion.services.mjs';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.mjs';

/**
 * Controller function to create a new promotion.
 * @param {Request} req - The HTTP request object
 * @param {Response} res - The HTTP response object
 * @param {NextFunction} next - The next middleware function
 */
const createPromotion = async (req, res, next) => {
    try {
      const newPromotion = await promotionService.createPromotion(req.body);
      res.status(httpStatus.CREATED).json(newPromotion);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller function to update an existing promotion.
   * @param {Request} req - The HTTP request object
   * @param {Response} res - The HTTP response object
   * @param {NextFunction} next - The next middleware function
   */
  const updatePromotion = async (req, res, next) => {
    try {
      const { promotionId } = req.params;
      const updatedPromotion = await promotionService.updatePromotion(promotionId, req.body);
      res.status(httpStatus.OK).json(updatedPromotion);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller function to cancel an ongoing promotion.
   * @param {Request} req - The HTTP request object
   * @param {Response} res - The HTTP response object
   * @param {NextFunction} next - The next middleware function
   */
  const cancelPromotion = async (req, res, next) => {
    try {
      const { promotionId } = req.params;
      const cancelledPromotion = await promotionService.cancelPromotion(promotionId);
      res.status(httpStatus.OK).json(cancelledPromotion);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller function to retrieve all current promotions.
   * @param {Request} req - The HTTP request object
   * @param {Response} res - The HTTP response object
   * @param {NextFunction} next - The next middleware function
   */
  const getAllPromotions = async (req, res, next) => {
    try {
      const promotions = await promotionService.getAllPromotions();
      res.status(httpStatus.OK).json(promotions);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller function to retrieve the latest promotion.
   * @param {Request} req - The HTTP request object
   * @param {Response} res - The HTTP response object
   * @param {NextFunction} next - The next middleware function
   */
  const getLatestPromotion = async (req, res, next) => {
    try {
      const latestPromotion = await promotionService.getLatestPromotion();
      res.status(httpStatus.OK).json(latestPromotion);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller function to retrieve a particular promotion by ID.
   * @param {Request} req - The HTTP request object
   * @param {Response} res - The HTTP response object
   * @param {NextFunction} next - The next middleware function
   */
  const getPromotionById = async (req, res, next) => {
    try {
      const { promotionId } = req.params;
      const promotion = await promotionService.getPromotionById(promotionId);
      if (!promotion) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Promotion not found' });
      }
      res.json(promotion);
    } catch (error) {
      next(error);
    }
  };
  
  export {
    createPromotion,
    updatePromotion,
    cancelPromotion,
    getAllPromotions,
    getLatestPromotion,
    getPromotionById
  };
  