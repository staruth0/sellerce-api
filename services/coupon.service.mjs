import Coupon from '../models/coupon.model.mjs';
import ApiError from '../utils/ApiError.mjs';

/**
 * Create a new coupon.
 * @param {Object} couponData - Data for the new coupon.
 * @returns {Promise<Object>} Created coupon.
 */
const createCoupon = async (couponData) => {
    try {
        const newCoupon = await Coupon.create(couponData);
        return newCoupon;
    } catch (error) {
        throw new ApiError('Failed to create coupon: ',error);
    }
};

/**
 * Get coupon details by coupon ID.
 * @param {string} couponId - ID of the coupon.
 * @returns {Promise<Object>} Coupon details.
 */
const getCouponById = async (couponId) => {
    try {
        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            throw new Error('Coupon not found');
        }
        return coupon;
    } catch (error) {
        throw new Error('Failed to get coupon details');
    }
};

/**
 * Get coupons by user ID.
 * @param {string} userId - ID of the user.
 * @returns {Promise<Array>} Coupons associated with the user.
 */
const getCouponsByUserId = async (userId) => {
    try {
        const coupons = await Coupon.find({ user_ids: userId });
        return coupons;
    } catch (error) {
        throw new ApiError('Failed to get coupons by user ID: ', error);
    }
};

 export{
    createCoupon,
    getCouponById,
    getCouponsByUserId
 }