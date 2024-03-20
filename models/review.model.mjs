import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer_name: {
      type: String,
      required: true,
    },
    image: String,
        
    product_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    user_rating: {
      type: Number,
      required: true,
    },
    like: {
      type: Boolean,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date_made: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
