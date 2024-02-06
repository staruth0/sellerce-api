import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    sales_id: {  // transaction id
        type: String,
        required:true
    },
    user_id: {
        type: String,
        required:true
    },
    products: [{
       product_id:{type:String, required:true},
       quantity: { type: Number, required: true },
       price:{type:Number, required:true}
    }],
    total_Amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true,
        default: 'paid',
        enum:['not paid', 'paid']
    },
    sales_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
   
},{ timestamps: true })

const Sales = mongoose.model('Sales', salesSchema);
export default Sales;