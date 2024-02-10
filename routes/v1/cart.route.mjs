import express from "express";
import cartController from '../../controllers/cart.controller.mjs'
const cartRouter = express.Router()


cartRouter.post('/', cartController.createCart);
cartRouter.get('/fetchAll', cartController.getCartDetails);

cartRouter.delete('/:id', cartController)



export default cartRouter;