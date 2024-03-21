import mongoose from "mongoose";
import toJSON from './plugins/toJSON.plugin.mjs';
import paginate from './plugins/paginate.plugin.mjs'

const couponSchema = new mongoose.Schema({
    percentage_deduction: { 
		type: Number , 
		required:true
	},
	user_ids: [String],
	product_id:{
		type:String
	},
	code: { 
		type: String, 
		required: true 
	},
	start_date: { 
		type: Date, 
		default: Date.now() 
	},
	available:{
		type:Boolean,
		default:true,
	},
	end_date: { 
		type: Date , 
		required:true},
},{ timestamps: true })

// add plugin that converts mongoose to json
couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;