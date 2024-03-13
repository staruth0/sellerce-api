import Message from "../models/message.model.mjs";

/**
 * create chat session
 * @param {object} messageBody
 * @returns {Promise<object>}
 */

const createMessage = async (messageBody) => {
  try {
    const message = await Message.create(messageBody);

    return message;
  } catch (error) {
    throw new Error("error saving messages");
  }
};

/**
 * get all chat sessions of a user
 * @param {string} chatId
 * @returns {Promise<Array>}
 */

const getAllMessages = async (chatId) => {
  try {
    const messages = await Message.find({ chat_id: chatId });
    if (messages) {
      return messages;
    } else {
      throw new Error(`Could not find messages with chatID: ${chatId}`);
    }
  } catch (error) {
    throw new Error("error fetching messages");
  }
};
/**
 * delete a message
 * @param {string} messageId
 * @returns {Promise<object>}
 */

const deleteMessage = async (messageId) => {
  try {
    const dmessage = await Message.findOneAndDelete({ _id: messageId });
    if (dmessage) {
      return dmessage;
    } else {
      throw new Error(`Could not find message with in id: ${messageId}`);
    }
  } catch (error) {
    throw new Error("error fetching messages");
  }
};

export { createMessage, getAllMessages, deleteMessage };
