import Joi from 'joi';

// Validation schema for creating a new coupon
const createCouponSchema = {
    body: Joi.object().keys({
        percentage_deduction: Joi.number().required(),
        user_ids: Joi.array().items(Joi.string().required()).min(1).required(),
        code: Joi.string().required(),
        start_date: Joi.date().default(Date.now()),
        end_date: Joi.date().required(),
    }),
  };
// Validation schema for getting coupon details by coupon ID
const getCouponByIdSchema = Joi.object({
    couponId: Joi.string().required(),
});

export{
    getCouponByIdSchema,
    createCouponSchema,
}