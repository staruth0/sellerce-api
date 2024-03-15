import express from 'express';
import {couponController} from '../../controllers/index.mjs'
import validate from '../../middlewares/validate.mjs';
import { couponValidation } from '../../validations/index.mjs';

const router = express.Router();

router.post('/',validate(couponValidation.createCouponSchema), couponController.createCoupon);
router.get('/:couponId',validate(couponValidation.getCouponByIdSchema), couponController.getCouponById);

export default router;
