import Joi from 'joi';
import { objectId } from './custom.validation.mjs';

const createHero = {
  body: Joi.object().keys({
    product_name: Joi.string().required(),
    category_name: Joi.string().required(),
    description: Joi.string().required(),
    slide_position: Joi.string().required(),
    imageUrl: Joi.string().uri(),  
  }),
};

const getHeroes = {
  query: Joi.object().keys({
    product_name: Joi.string(),
    category_name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    filter: Joi.string().allow(''),
    options: Joi.string().allow(''),
  }),
};



const getHero = {
  params: Joi.object().keys({
    heroId: Joi.string().custom(objectId),
  }),
};

const updateHero = {
  params: Joi.object().keys({
    heroId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      product_name: Joi.string(),
      category_name1: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string().uri(),
    })
    .min(1),
};

const deleteHero = {
  params: Joi.object().keys({
    heroId: Joi.string().custom(objectId),
  }),
};

export { createHero, getHeroes, getHero, updateHero, deleteHero };
