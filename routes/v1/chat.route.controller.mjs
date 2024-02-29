import express from "express";
import chatController from "../../controllers/chat.controller.mjs";
import validate from '../../middlewares/validate.mjs';
import { creatChatValidation } from '../../validations/chat.validation.mjs';

const chatRouter = express.Router();

chatRouter.post('/create', validate(creatChatValidation), chatController.createChat);
chatRouter.get('/fetchAll/:userId', chatController.getAllChats);
chatRouter.delete('/delete/:chat_id', chatController.deleteChat);

export default chatRouter;