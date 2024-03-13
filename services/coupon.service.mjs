import Coupon from '../models/coupon.model.mjs';

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
        throw new Error('Failed to create coupon');
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

 export{
    createCoupon,
    getCouponById
 }