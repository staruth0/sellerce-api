import Joi from "joi";
/**
 * Validation schema for creating Review
 */

const createReviewValidation = {
  body: Joi.object({
    review_id: Joi.string().required(),
    image: Joi.string().required(),
    product_name: Joi.string().required(),
    reviewer_name: Joi.string().required(),
    user_rating: Joi.number(),
    like: Joi.boolean(),
    comment: Joi.string(),
    date_made: Joi.date().required(),
  }),
};

/**
 * Validation schema for deleting review
 */
const deleteReviewValidation = {
  params: Joi.object().keys({
    review_id: Joi.string().required(),
  }),
};


export {createReviewValidation,deleteReviewValidation};
