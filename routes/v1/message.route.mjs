import express from "express";
import messageController from "../../controllers/message.controller.mjs";

const messageRouter = express.Router();



messageRouter.post('/create', messageController.createMessage);
messageRouter.get('/fetchAll/:chat_id', messageController.getAllMessages);
messageRouter.delete('/delete/:message_id', messageController.deleteMessage);

export default messageRouter; 