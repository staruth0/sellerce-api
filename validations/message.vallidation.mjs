import Joi from 'joi'

/**
 * Validation schema for creating a message
 */

const creatMessageValidation = {
    body: Joi.object({
        chat_id: Joi.string().required(),
        message_id: Joi.string.required(),
        user_id: Joi.string.required(),
        text:Joi.string.required(),
    })
}