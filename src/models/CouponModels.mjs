import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    percentage_deduction: { type: Number , required:true},
	user_ids: [String],
	code: { type: String, required: true },
	start_date: { type: Date, default: Date.now() },
	end_date: { type: Date , required:true},
})

const Coupon = mongoose.model('Coupon', promotionSchema);
export default Coupon;