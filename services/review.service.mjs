import Review from "../models/review.model.mjs";
import User from "../models/user.model.mjs";
import {BaseProduct} from "../models/product.model.mjs";

/**
 * Create a new review
 * @param {object} reviewData 
 * @returns {Promise<object>} 
 */
const createReview = async (reviewData) => {
  try {
    const review = await Review.create(reviewData);
    return review;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating review");
  }
};

/**
 * Get all reviews
 * @returns {Promise<Array>} 
 */
const getAllReviews = async () => {
  try {
    const reviewData = await Review.find({});
    return reviewData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching reviews");
  }
};

/**
 * Delete a review by its ID
 * @param {string} reviewId 
 * @returns {Promise<object>}
 */
const deleteReview = async (reviewId) => {
  try {
    const review = await Review.findOneAndDelete({review_id:reviewId});
     if (review) {
        return review;
    } else {
      throw new Error(`Could not find review with ID: ${reviewId}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting review");
  }
};

/**
 * Get reviews by username
 * @param {string} username 
 * @returns {Promise<Array>} 
 */
const getReviewByUserName = async (username) => {
  try {
    const user = await User.findOne({ firstName: username });

    if (!user) {
      throw new Error(`Could not find user with name: ${username}`);
    }

    const reviews = await Review.find({ user_id: user.user_id });
    return reviews;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching review by username");
  }
};

/**
 * Get reviews by product name
 * @param {string} productName 
 * @returns {Promise<Array>} 
 */
const getReviewByProductName = async (productName) => {
  try {
    const reviews = await Review.find({ product_name: productName });
    return reviews;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching review by product name");
  }
};

/**
 * Get reviews by rating
 * @param {number} rating 
 * @returns {Promise<Array>} 
 */
const getReviewByRating = async (rating) => {
  try {
    const reviews = await Review.find({ user_rating: rating });

    if (!reviews || reviews.length === 0) {
      throw new Error(`Could not find reviews rated: ${rating}`);
    }

    return reviews;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching reviews by rating");
  }
};

/**
 * Get reviews by date added
 * @param {string} date  
 * @returns {Promise<Array>} 
 */
const getReviewByDateAdded = async (date) => {
  try {
    const reviews = await Review.find({ date_made: date });

    if (!reviews || reviews.length === 0) {
      throw new Error(`Could not find reviews added on: ${date}`);
    }

    return reviews;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching reviews by date");
  }
};

export {createReview,getAllReviews,deleteReview,getReviewByUserName,getReviewByProductName,getReviewByRating,getReviewByDateAdded,
};