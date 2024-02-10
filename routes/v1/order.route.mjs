import express from "express";
import orderController from '../../controllers/cart.controller.mjs'
const orderRouter = express.Router()


orderRouter.post('/', orderController);

orderRouter.delete('/:id', orderController)



export default orderRouter;