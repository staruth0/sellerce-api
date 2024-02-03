import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
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

const Review = mongoose.model("Review", reviewSchema);
export default  Review;