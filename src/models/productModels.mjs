const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    year_introduced: {
        type: Date,
        required: true,
    },
    capacity: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity_in_stock: {
        type: Number,
        required:true,
    },
    Last_day_updated: {
        type: Date,
        required:true,
    },
    Who_updated: {
        type: String,
        required:true,
    },
    model: {
        type: String,
        required: true,
        trim:true,
    },
    category: {
        type: String,
        required: true,
        trim:true,
    },
    featured: {
        type: Boolean,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim:true,
    },
    media: [{
        image: { type: String, required: true },
        color: {type:String, required:true},
        size: { type: String },
        video:{type:String}
    }]

})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;