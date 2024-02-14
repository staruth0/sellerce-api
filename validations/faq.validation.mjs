import Joi from "joi";
/**
 * Validation schema for creating an Cart
 */

const createFAQValidation = {
  body: Joi.object({
    id: Joi.string().required(),
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
};

/**
 * Validation schema for updating FAQ
 */
const updateFAQValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

/**
 * Validation schema for deleting FAQ
 */
const deleteFAQValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export { createFAQValidation, updateFAQValidation,deleteFAQValidation};
