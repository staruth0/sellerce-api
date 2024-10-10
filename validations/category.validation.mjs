import Joi from 'joi';

const createCategory = {
  body: Joi.object().keys({
    categoryName: Joi.string().required(),
    featuredImage: Joi.string(),
    featuredProductName: Joi.string().required(),
    heroImage: Joi.string(),
    design: Joi.string().required(),
    performance: Joi.string().required(),
    integration: Joi.string().required(),
    overview: Joi.string().required(),
    heroTitle: Joi.string().required(),
    heroDescription: Joi.string().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    id: Joi.string(),
    categoryName: Joi.string(),
    featuredProductName: Joi.string(),
    heroImage: Joi.string(),
    design: Joi.string(),
    performance: Joi.string(),
    integration: Joi.string(),
    overview: Joi.string(),
    heroTitle: Joi.string(),
    heroDescription: Joi.string(),
  }).min(1), // At least one field is required for update
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

export { createCategory, updateCategory, getCategory, deleteCategory };
