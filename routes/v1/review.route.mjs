import express from "express";
import reviewController from '../../controllers/review.controller.mjs';
import validate from '../../middlewares/validate.mjs';
import {createReviewValidation,deleteReviewValidation} from '../../validations/review.validation.mjs';

const reviewRouter = express.Router();

reviewRouter.post('/create', validate(createReviewValidation), reviewController.createReview);
reviewRouter.get('/fetchAll', reviewController.getAllReviews);
reviewRouter.get('/fetchAllbyusername/:username', reviewController.getReviewByUserName);
reviewRouter.get('/fetchAllbyproductname/:productname', reviewController.getReviewByProductName);
reviewRouter.get('/fetchAllbyrating/:rating', reviewController.getReviewByRating);
reviewRouter.get('/fetchAllbydate/:date', reviewController.getReviewByDateAdded);
reviewRouter.delete('/delete/:review_id', validate(deleteReviewValidation), reviewController.deleteReview);

export default reviewRouter;