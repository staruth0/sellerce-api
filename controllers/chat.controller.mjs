import httpStatus from "http-status";
import { createChat, getAllChats , deleteChat} from '../services/chat.service.mjs'



const chatController = {

    createChat: async (req,res) => {
        try {
            const chat = await createChat(req.body);
            res.status(httpStatus.CREATED).json(chat);
        } catch (error) {
            console.log(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('error create chat');
        }
     },
   getAllChats: async (req, res) => {
      try {
          const { userId } = req.params;
          const chat = await getAllChats(userId);
            res.status(httpStatus.OK).json(chat);
        } catch (error) {
            console.log(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('error fetching chats');
        }
   },
   deleteChat: async (req, res) => {
      try {
          const { chat_id } = req.params;
          const dchat = await deleteChat(chat_id);
          res.status(httpStatus.OK).json(dchat);
        } catch (error) {
            console.log(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('error deleting chat');
        }
   }
}


export default chatController;