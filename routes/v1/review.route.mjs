import express from "express";
import reviewController from '../../controllers/review.controller.mjs'
const reviewRouter = express.Router()


reviewRouter.post('/create', reviewController.createReview);

reviewRouter.get('/fetchAll', reviewController.getAllReviews);

reviewRouter.get('/fetchAllbyusername/:username', reviewController.getReviewByUserName);
reviewRouter.get('/fetctAllbyproductname/:productname', reviewController.getReviewByProductName);
reviewRouter.get('/fetchAllbyrating/:rating', reviewController.getReviewByRating);
reviewRouter.get('/fetchAllbydate/:date', reviewController.getReviewByDateAdded);

reviewRouter.delete('/delete/:id', reviewController.deleteReview);



export default reviewRouter;