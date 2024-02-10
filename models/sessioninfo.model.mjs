import mongoose from "mongoose";

const sessioninfoSchema = new mongoose.Schema({
    session_id: { type: String , required:true},
    session_data:[{}],
	start_date: { type: Date, default: Date.now() },
	end_date: { type: Date , required:true},
},{ timestamps: true })

const Session = mongoose.model('Session', sessioninfoSchema);
export default Session;