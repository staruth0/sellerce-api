import Joi from 'joi';
import { password } from './custom.validation.mjs';
/**
 * Validation schema for creating an admin
 */

const createAdminValidation = {
    body: Joi.object({
    admin_id: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().custom(password).required(),
    image: Joi.string().required(),
    phone:Joi.string().required(),
    biography: Joi.string().required(),
    role: Joi.string().required().valid('super admin', 'admin'),
    previledges:Joi.array().items(Joi.string()).required(),
    })
}

/**
 * Validation schema for updating admin previledges
 */

const updateAdminValidation = {
    params: Joi.object().keys({
       admin_id: Joi.string().required(),
    }),  
}

export  { createAdminValidation, updateAdminValidation }