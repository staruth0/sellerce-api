const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    coupon_id: { type: String , required:true},
    name: { type: String, required: true },
	user_ids: [String],
	code: { type: String, required: true },
	start_date: { type: Date, default: Date.now() },
	end_date: { type: Date , required:true},
})

const Coupon = mongoose.model('Coupon', promotionSchema);
module.exports = Coupon;