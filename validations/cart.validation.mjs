import Joi from "joi";
/**
 * Validation schema for creating an Cart
 */

const createCartValidation = {
  body: Joi.object({
    cart_id: Joi.string().required(),
    user_id: Joi.string().required(),
    items: Joi.array().items(
      Joi.object({
        product_id: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
      })
    ),
  }),
};


/**
 * Validation schema for updating Cart
 */

const updateAddToCardValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

const updateRemoveInCardValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
    product_id: Joi.string().required(),
  }),
};

const updateQ$PInCardValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
    product_id: Joi.string().required(),
  }),
};

const deleteCardValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

export { createCartValidation, updateAddToCardValidation,updateQ$PInCardValidation,deleteCardValidation,updateRemoveInCardValidation};
