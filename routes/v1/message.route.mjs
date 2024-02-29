import express from "express";
import messageController from "../../controllers/message.controller.mjs";
import validate from '../../middlewares/validate.mjs';
import { creatMessageValidation } from '../../validations/message.vallidation.mjs';

const messageRouter = express.Router();

messageRouter.post('/send', validate(creatMessageValidation), messageController.createMessage);
messageRouter.get('/fetchAll/:chat_id', messageController.getAllMessages);
messageRouter.delete('/delete/:message_id', messageController.deleteMessage);

export default messageRouter;