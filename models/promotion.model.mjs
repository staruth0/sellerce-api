import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    promotion_id: { type: String , required:true},
    name: { type: String, required: true },
    description:{type:String},
	product_ids: [String],
	percentage: { type: Number, required: true },
	start_date: { type: Date, default: Date.now() },
	end_date: { type: Date , required:true},
},{ timestamps: true })

const Promotion = mongoose.model('Promotion', promotionSchema);
export default Promotion;