const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	message_id: { type: String , required:true},
	adminId: { type: String, required: true },
	userId: { type: String, required: true },
	messages: [{
	sender: { type: String, required: true },
	text: { type: String, required: true, default: "" },
	timestamp: { type: Date, required: true, default: Date.now() },
}],
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;