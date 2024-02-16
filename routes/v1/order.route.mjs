import express from "express";
import ordersController from '../../controllers/order.controller.mjs'
const orderRouter = express.Router()


orderRouter.post('/create', ordersController.createOrder);
orderRouter.get('/fetchAll', ordersController.getAllOrders);
orderRouter.get('/fetchOne/:order_id', ordersController.getAParticularOrder);

orderRouter.delete('/:id', ordersController.deleteOrder)



export default orderRouter;