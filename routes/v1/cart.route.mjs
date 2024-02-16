import express from "express";
import cartController from '../../controllers/cart.controller.mjs'
const cartRouter = express.Router()


cartRouter.post('/create', cartController.createCart);
cartRouter.get('/fetchCart/:user_id', cartController.getCartDetail);
cartRouter.put('/update/addItem/:user_id', cartController.updateAddCartItems);
cartRouter.put('/update/RemoveItem/:user_id/:product_id', cartController.updateRemoveCartItems);
cartRouter.put('/update/updateQuantityAndPrice/:user_id/:product_id', cartController.updateQuantityAndPriceOfItem);
cartRouter.delete('/delete/:user_id', cartController.deleteCart);



export default cartRouter; 