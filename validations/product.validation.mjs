import Joi from 'joi';
// import { password } from './custom.validation.mjs';
/**
 * Validation schema for creating a new product
 */
const createProductValidation = {
    body: Joi.object().keys({
      product_id:Joi.string().required(),
      name: Joi.string().required(),
      category: Joi.string().required(),
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
        batteryLive: Joi.string().required(),
        batteryLive:Joi.string().optional().when('category', {
          is: 'tvandhome',
          then: Joi.forbidden().strip()
        }),
        batteryLive:Joi.string().optional().when('category', {
          is: 'tv and home',
          then: Joi.forbidden().strip() 
        }),
        sales_count: Joi.number().default(0),
        screenResolution: Joi.string().optional().when('category', {
          is: 'Watch',
          then: Joi.forbidden().strip() // Strip osVersion if category is Watch
        }),
        screenResolution: Joi.string().optional().when('category', {
          is: 'Airpods',
          then: Joi.forbidden().strip() // Strip osVersion if category is Watch
        }),
        cameraModel: Joi.string().optional().when('category', {
          is: 'Watch',
          then: Joi.forbidden().strip() // Strip osVersion if category is Watch
        }),
        cameraModel: Joi.string().optional().when('category', {
          is: 'Airpods',
          then: Joi.forbidden().strip() // Strip osVersion if category is Watch
        }),
        osVersion: Joi.string().optional().when('category', {
          is: 'Watch',
          then: Joi.forbidden().strip() // Strip osVersion if category is Watch
        }),
        osVersion: Joi.string().optional().when('category', {
          is: 'Airpods',
          then: Joi.forbidden().strip() // Strip osVersion if category is Watch
        }),
        // applies only when category is watch
        strap_material: Joi.string().when('category', {
            is: 'watch',
            then: Joi.string().required(),
            otherwise: Joi.string().allow('').optional() // Allow empty string when category is not 'watch'
          }),
        otherVariant: Joi.array().items(Joi.object().keys({
          price: Joi.number().required(),
          color: Joi.string().required(),
          image: Joi.array().items(Joi.string()).required(),
          color_quantity_in_stock: Joi.number().required(),
          storageCapacity: Joi.string().optional().when('category', {
            is: 'Watch',
            then: Joi.forbidden().strip() // Strip osVersion if category is Watch
          }),
          storageCapacity: Joi.string().optional().when('category', {
            is: 'Airpods',
            then: Joi.forbidden().strip() // Strip osVersion if category is Watch
          }),
          internalMemory: Joi.string().optional().when('category', {
            is: 'Watch',
            then: Joi.forbidden().strip() // Strip osVersion if category is Watch
          }),
          internalMemory: Joi.string().optional().when('category', {
            is: 'Airpods',
            then: Joi.forbidden().strip() // Strip osVersion if category is Watch
          })
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
  