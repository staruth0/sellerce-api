import Review from "../models/review.model.mjs";
import User from "../models/user.model.mjs";
import Product from "../models/product.model.mjs";

const reviewController = {
  createReview: async (req, res) => {
    try {
      const review = await Review.create(req.body);
      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).send("error creating review");
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviewData = await Review.find({});
      res.status(200).json(reviewData);
    } catch (error) {
      console.error(error);
      res.status(500).send("error fatching reviews");
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { id } = req.params;
      const reviewD = await Review.findByIdAndDelete(id);

      reviewD
        ? res.status(200).send("succesfully deleted review")
        : res.status(404).send(`couldnt find review with ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("error deleting review");
    }
  },

  getReviewByUserName: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ firstName: username });

      if (!user) {
        res.status(404).send(`couldnt find user with name: ${username}`);
      } else {
        const review = await Review.find({ user_id: user.userID });
        res.status(200).json(review);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error fetching review by username");
    }
  },

  getReviewByproductName: async (req, res) => {
    try {
      const { productname } = req.params;
      const product = await Product.findOne({ name: productname });

      if (!product) {
        res.status(404).send(`couldnt find user with name: ${productname}`);
      } else {
        const review = await Review.find({ product_id: product.product_id });
        res.status(200).json(review);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error fetching review by productname");
    }
  },

  getReviewByRating: async (req, res) => {
    try {
      const { rating } = req.params;
      const review = await Review.find({ user_rating: rating });

      if (!review) {
        res.status(404).send(`couldnt find review rated: ${rating}`);
      } else {
        res.status(200).json(review);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error fetching review rating");
    }
    },
  
  getReviewByDateAdded: async (req, res) => {
    try {
      const { date } = req.params;
      const review = await Review.find({ date_made: date });

      if (!review) {
        res.status(404).send(`couldnt find review added on: ${date}`);
      } else {
        res.status(200).json(review);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error fetching review by date");
    }
  },
};

export default reviewController;
