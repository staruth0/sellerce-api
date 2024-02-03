const mongoose = require('mongoose');

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
       price:{type:Number, required:true}
   }],
    total_Amount: {
        type: Number,
        required: true
    },
    order_status: {
        type: String,
        default: "Pending",
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
   
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;