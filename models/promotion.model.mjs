import mongoose from "mongoose";
import toJSON from './plugins/toJSON.plugin.mjs';
import paginate from './plugins/paginate.plugin.mjs'


const promotionSchema = new mongoose.Schema({
    promotion_id: { 
		type: String , 
		required:true,
		unique: true,
        trim: true,
	},
    name: { 
		type: String, 
		required: true,
		unique: true,
	},
    description:{
		type:String
	},
	product_ids: [String],
	percentage: { 
		type: Number, 
		required: true 
	},
	start_date: { 
		type: Date, 
		default: Date.now() 
	},
	end_date: { 
		type: Date , 
		required:true
	},
},
{ 
	timestamps: true 
})

// add plugin that converts mongoose to json
promotionSchema.plugin(toJSON);
promotionSchema.plugin(paginate);
const Promotion = mongoose.model('Promotion', promotionSchema);
export default Promotion;