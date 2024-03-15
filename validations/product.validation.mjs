import Joi from 'joi';
// import { password } from './custom.validation.mjs';
/**
 * Validation schema for creating a new product
 */
const createProductValidation = {
    body: Joi.object().keys({
      product_id:Joi.string().required(),
      name: Joi.string().required(),
      category: Joi.string(),
      price: Joi.number().required(),
      description: Joi.object().keys({
        overview: Joi.array().items(Joi.object().keys({
          heading: Joi.string().required(),
          explanation: Joi.string().required()
        })).required(),
        long_description: Joi.string().required()
      }).required(),
      quantity_in_stock: Joi.number().required(),
      Who_updated: Joi.string().required(),
      featured: Joi.object().keys({
        answer: Joi.boolean().required(),
        hero_display: Joi.object().keys({
          answer: Joi.boolean().required()
        }).required(),
        caption: Joi.string().when('answer', { is: true, then: Joi.required() }),
        time: Joi.date()
      }).required(),
      variants: Joi.array().items(Joi.object().keys({
        model: Joi.string().required(),
        year_introduced: Joi.number().required(),
        price: Joi.number().required(),
        salescount: Joi.number().default(0),
        storageCapacity: Joi.string().when('category', {
          is: Joi.valid('phone', 'laptop', 'tablet'),
          then: Joi.required()
        }),
        internalMemory: Joi.string().when('category', {
          is: Joi.valid('phone', 'laptop', 'tablet'),
          then: Joi.required()
        }),
        batteryLive: Joi.string().when('category', {
          is: Joi.valid('phone', 'laptop', 'tablet'),
          then: Joi.required()
        }),
        screenResolution: Joi.string().when('category', {
          is: Joi.valid('phone', 'laptop', 'tablet'),
          then: Joi.required()
        }),
        cameraModel: Joi.string().when('category', {
          is: Joi.valid('phone', 'laptop', 'tablet'),
          then: Joi.required()
        }),
        osVersion: Joi.string().when('category', {
          is: Joi.valid('phone', 'laptop', 'tablet'),
          then: Joi.required()
        }),
        // applies only when category is watch
        strap_material: Joi.string().when('category', {
            is: 'watch',
            then: Joi.string().required(),
            otherwise: Joi.string().allow('').optional() // Allow empty string when category is not 'watch'
          }),
        otherVariant: Joi.array().items(Joi.object().keys({
          color: Joi.string().required(),
          image: Joi.array().items(Joi.string()).required(),
          color_quantity_in_stock: Joi.number().required(),
        })).required(),
        model_quantity_in_stock: Joi.number().required(),
      })).required(),
      other_media: Joi.array().items(Joi.string()).required(),
    })
  };
  
  
  
  
 /**
 * Validation schema for updating an existing product
 */
const updateProductByIdValidation = {
    params: Joi.object().keys({
      productId: Joi.string().required(),
    }),
    body: Joi.object().keys({
    product_id: Joi.string(),
      name: Joi.string(),
      category: Joi.string(),
      price: Joi.number(),
      description: Joi.object().keys({
        overview: Joi.array().items(Joi.object().keys({
          heading: Joi.string().required(),
          explanation: Joi.string().required()
        })),
        long_description: Joi.string()
      }),
      quantity_in_stock: Joi.number(),
      Who_updated: Joi.string(),
      featured: Joi.object().keys({
        answer: Joi.boolean(),
        hero_display: Joi.object().keys({
          answer: Joi.boolean()
        }),
        caption: Joi.string().when('featured.answer', { is: true, then: Joi.required() }),
        time: Joi.date().when('featured.answer', { is: true, then: Joi.required() })
      }),
      other_media: Joi.array().items(Joi.string()),
    }).min(1) // Ensure at least one field is being updated
  };
  
  
  /**
   * Validation schema for getting a product by its ID
   */
  const getProductByIdValidation = {
    params: Joi.object().keys({
      productId: Joi.string().required(),
    }),
  };
  
  // Add more validation schemas as needed
  
  export {
    createProductValidation,
    updateProductByIdValidation,
    getProductByIdValidation,
  };
  