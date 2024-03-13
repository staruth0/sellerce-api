import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
	chat_id:mongoose.Schema.Types.ObjectId,
	members: {
		type: Array,
		required: true,
	},
},{ timestamps: true });

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;