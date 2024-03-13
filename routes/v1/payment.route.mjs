import express from "express";
import paymentController from '../../controllers/payment.controller.mjs'
const paymentRouter = express.Router()


paymentRouter.post('/makepayment', paymentController.makePayment);

export default paymentRouter;