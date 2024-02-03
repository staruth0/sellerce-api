const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	_id: { type: String },
	adminId: { type: String, required: true },
	userId: { type: String, required: true },
	messages: [MessageSchema],
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;