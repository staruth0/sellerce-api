import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order_id: {
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
        price: { type: Number, required: true },
       color:{type:String,required:true}
    }],
    delivery_info: {
        tracking_number: {
            type:String
        },
        delivery_date: {
           type:Date,  
        },
        delivery_person: {
            type:String
        }
    },
    total_Amount: {
        type: Number,
        required: true
    },
    order_status: {
        type: String,
        default: "Pending",
        enum:['Pending','Delivered','Failed'],
        required: true
    },
    payment_status: {
        type: String,
        required: true,
        default: 'not paid',
        enum:['not paid', 'paid']
    },
    order_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
   
},{ timestamps: true })

const Order = mongoose.model('Order', orderSchema);
export default Order;