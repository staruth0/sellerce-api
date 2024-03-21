import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message_id: mongoose.Schema.Types.ObjectId,
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',  
    },
    userId: { type: String, required: true },	
    text: { type: String, required: true, default: "" },
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);
export default Message;