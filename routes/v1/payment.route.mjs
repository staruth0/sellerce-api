import express from "express";
import paymentController from '../../controllers/payment.controller.mjs'
const paymentRouter = express.Router()


paymentRouter.post('/', paymentController);

paymentRouter.delete('/:id', paymentController);



export default testimonialRouter;