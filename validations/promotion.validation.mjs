import Joi from 'joi';

// Validation schema for creating a new promotion
const createPromotionSchema = {
    body: Joi.object().keys({
        promotion_id:Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        product_ids: Joi.array().items(Joi.string()).required(),
        percentage: Joi.number().required(),
        start_date: Joi.date().default(Date.now()),
        end_date: Joi.date().required(),
    }),
  };

  // Validation schema for updating an existing promotion
  const updatePromotionSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    product_ids: Joi.array().items(Joi.string()),
    percentage: Joi.number(),
    start_date: Joi.date(),
    end_date: Joi.date(),
  }).min(1); // At least one field is required for update
  
  // Validation schema for cancelling a promotion
  const cancelPromotionSchema = Joi.object({
    end_date: Joi.date().required(),
  });
  
  // Validation schema for retrieving promotions by query parameters
  const getPromotionsSchema = Joi.object({
    name: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  });


// Validation schema for promotion ID
const promotionIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export{
    createPromotionSchema,
    updatePromotionSchema,
    promotionIdSchema,
    cancelPromotionSchema,
    getPromotionsSchema
}