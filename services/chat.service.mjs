import Chat from "../models/chat.model.mjs";


/**
 * create chat session
 * @param {object} chatBody
 * @returns {Promise<object>}
 */

const createChat = async (chatBody) => {
    try {
        const chat = await Chat.create(chatBody);
        return chat;       
    } catch (error) {
        throw new Error('error creating chat session')
    }
}

/**
 * get all chat sessions of a user
 * @param {string} userId
 * @returns {Promise<Array>}
 */

const getAllChats = async (userId) => {
    try {
        const chat = await Chat.find({ members: { $in: userId} });
        return chat;       
    } catch (error) {
        throw new Error('error fetching chats')
    }
}


/**
 * get all chat sessions of a user
 * @param {string} chatId
 * @returns {Promise<object>}
 */

const deleteChat = async (chatId) => {
    try {
        const dchat = await Chat.findOneAndDelete({ chat_id :chatId})
        if (dchat) {
      return dchat;
    } else {
      throw new Error(`Could not find chat with id: ${chatId}`);
    }      
    } catch (error) {
        throw new Error('error deleting chat')
    }
}

export {  createChat , getAllChats, deleteChat}