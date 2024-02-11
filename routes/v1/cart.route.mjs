import express from "express";
import cartController from '../../controllers/cart.controller.mjs'
const cartRouter = express.Router()


cartRouter.post('/', cartController.createCart);
cartRouter.get('/fetchCart/:user_id', cartController.getCartDetail);
cartRouter.put('/update/addItem/:card_id', cartController.updateAddCartItems);
cartRouter.put('/update/RemoveItem/:card_id/:product_id', cartController.updateRemoveCartItems);
cartRouter.delete('/:id', cartController.deleteCart)



export default cartRouter;