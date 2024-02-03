const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    review_id: {
        type: String,
        required:true,
    },
    product_id: {
        type: String,
        required:true,
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_rating: {
        type: Number,
        required: true
    },
    like: {
        type: Boolean,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    date_made: {
        type: Date,
        default: Date.now(),
        required:true
    }
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;