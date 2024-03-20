import express from "express";
import ordersController from '../../controllers/order.controller.mjs';
import validate from '../../middlewares/validate.mjs';
import {createOrderValidation,getOrderByIdValidation,deleteOrderValidation} from '../../validations/order.validation.mjs';

const orderRouter = express.Router();

orderRouter.post('/create', validate(createOrderValidation), ordersController.createOrder);
orderRouter.get('/fetchAll', ordersController.getAllOrders);
orderRouter.get('/fetchOne/:order_id', validate(getOrderByIdValidation), ordersController.getAParticularOrder);
orderRouter.delete('/delete/:id', validate(deleteOrderValidation), ordersController.deleteOrder);

export default orderRouter;