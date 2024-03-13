import Joi from 'joi'

/**
 * Validation schema for creating a chat
 */

const creatChatValidation = {
    body: Joi.object({
        chat_id: Joi.string().required(),
        members:Joi.array().items()
    })
}

export {creatChatValidation}