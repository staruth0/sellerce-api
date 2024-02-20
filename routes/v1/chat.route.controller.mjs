import express from "express";
import chatController from "../../controllers/chat.controller.mjs";

const chatRouter = express.Router();



chatRouter.post('/create', chatController.createChat);
chatRouter.get('/fetchAll/:userId', chatController.getAllChats);
chatRouter.delete('/delete/:chat_id', chatController.deleteChat);

export default chatRouter; 