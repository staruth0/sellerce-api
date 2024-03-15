// coupon.controller.mjs

import * as couponService from '../services/coupon.service.mjs';

/**
 * Controller to Create a new coupon.
 */
const createCoupon = async (req, res) => {
    try {
        const newCoupon = await couponService.createCoupon(req.body);
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

export{
    getCouponById,
    createCoupon
}