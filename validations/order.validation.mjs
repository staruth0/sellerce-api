import Joi from "joi";
/**
 * Validation schema for creating an Cart
 */

const createOrderValidation = {
  body: Joi.object({
    order_id: Joi.string().required(),
    user_id: Joi.string().required(),
    products: Joi.array().items(
      Joi.object().keys({
        product_id: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        color: Joi.string().required(),
      })
    ),
    delivery_info: Joi.object({
      tracking_number: Joi.string().required(),
      delivery_date: Joi.date().required(),
      delivery_person: Joi.string().required(),
    }),
    total_Amount: Joi.number().required(),
    order_status: Joi.string()
      .required()
      .valid("Pending", "Delivered", "Failed"),
    payment_status: Joi.string().required().valid("Not Paid", "Paid"),
    order_date: Joi.date().required(),
  }),
};

/**
 * Validation schema for getting orderby id
 */
const getOrderByIdValidation = {
  params: Joi.object().keys({
    order_id: Joi.string().required(),
  }),
};

/**
 * Validation schema for deleting FAQ
 */
const deleteOrderValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export {createOrderValidation,getOrderByIdValidation,deleteOrderValidation};
