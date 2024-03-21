// coupon.controller.mjs

import * as couponService from '../services/coupon.service.mjs';

/**
 * Controller to Create a new coupon.
 */
const createCoupon = async (req, res,next) => {
    try {
        const newCoupon = await couponService.createCoupon(req.body);
        res.status(201).json(newCoupon);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to Get coupon details by coupon ID.
 */
const getCouponById = async (req, res) => {
    try {
        const coupon = await couponService.getCouponById(req.params.couponId);
        res.json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Controller function to get coupons by user ID.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 */
const getCouponsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const coupons = await couponService.getCouponsByUserId(userId);
        res.status(httpStatus.OK).json(coupons);
    } catch (error) {
        next(error);
    }
};
export{
    getCouponById,
    createCoupon,
    getCouponsByUserId
}