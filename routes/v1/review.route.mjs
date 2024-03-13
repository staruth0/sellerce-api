import express from "express";
import reviewController from '../../controllers/review.controller.mjs'
const reviewRouter = express.Router()


reviewRouter.post('/create', reviewController.createReview);

reviewRouter.get('/fetchAll', reviewController.getAllReviews);

reviewRouter.get('/fetchAll/:username', reviewController.getReviewByUserName);
reviewRouter.get('/fetctAll/:productname', reviewController.getReviewByproductName);
reviewRouter.get('/fetchAll/:rating', reviewController.getReviewByRating);
reviewRouter.get('/fetchAll/:date', reviewController.getReviewByDateAdded);

reviewRouter.delete('/delete/:id', reviewController.deleteReview);



export default reviewRouter;