import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cart_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        default: null
    },
    items: [{
        product_id: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
},{ timestamps: true })

const Cart = mongoose.model('Cart', cartSchema);
export default Cart; 