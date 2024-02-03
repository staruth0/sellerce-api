import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        required:true
   },
    order_id: {
        type: String,
        required:true
    },
    user_id: {
        type: String,
        required:true
    },
    total_Amount: {
        type: Number,
        required: true
    },
    currency: String,

    payment_method: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum:['success', 'pending','failed']
    },
    payment_date: {
        type: Date,
        required: true,
        default: Date.now(),
   }
})

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;