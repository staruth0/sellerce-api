import express from "express";
import cartController from '../../controllers/cart.controller.mjs';
import validate from '../../middlewares/validate.mjs';
import {createCartValidation,updateAddToCardValidation,updateRemoveInCardValidation,updateQ$PInCardValidation,deleteCardValidation} from '../../validations/cart.validation.mjs';

const cartRouter = express.Router();

cartRouter.post('/create', validate(createCartValidation), cartController.createCart);
cartRouter.get('/fetchCart/:user_id', cartController.getCartDetail);
cartRouter.put('/update/addItem/:user_id', validate(updateAddToCardValidation), cartController.updateAddCartItems);
cartRouter.put('/update/removeItem/:user_id/:product_id', validate(updateRemoveInCardValidation), cartController.updateRemoveCartItems);
cartRouter.put('/update/updateQuantityAndPrice/:user_id/:product_id', validate(updateQ$PInCardValidation), cartController.updateQuantityAndPriceOfItem);
cartRouter.delete('/delete/:user_id', validate(deleteCardValidation), cartController.deleteCart);

export default cartRouter;