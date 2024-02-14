import httpStatus from "http-status";
import { createCart, getCardById, updateAddCartItems,updateRemoveCartItems,updateQuantityAndPriceOfItem,deleteCart} from "../services/cart.service.mjs";

const cartController = {
    createCart: async (req, res) => {
        try {
            const cartDetail = await createCart(req.body)
            res.status(httpStatus.CREATED).json(cartDetail);
        } catch (error) {
            console.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('There was an error creating the cart.');
        }
    },
    

    getCartDetail: async (req, res) => {
        try {
            const { user_id } = req.params;
            const cart = await getCardById(user_id)
            res.status(200).json(cart)
        } catch (error) {
            console.error(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('There was an error fetching the cart detail.');
        }
    },

updateAddCartItems: async (req, res) => {
  try {
    const { user_id } = req.params;
    const cart = await updateAddCartItems(user_id, req.body);
    res.status(httpStatus.OK).json(cart);
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error updating items in cart');
  }
}
    ,

updateRemoveCartItems: async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
    const newCart = await updateRemoveCartItems(user_id, product_id)
    res.status(httpStatus.OK).json(newCart)
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error updating items in cart');
  }
  },
    
  updateQuantityAndPriceOfItem: async (req, res) => {
    try {
      const { user_id, product_id } = req.params;
      const { quantity } = req.body;

      const updatedCart = await updateQuantityAndPriceOfItem(
        user_id,
        product_id,
        quantity
      );

      res.status(httpStatus.OK).json(updatedCart);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error updating items in cart");
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { user_id } = req.params;

      const deletedCart = await deleteCart(user_id);

      res.status(httpStatus.OK).json({
        message: "Success deleting cart",
        deletedCart,
      });
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("There was an error deleting the cart.");
    }
  },

};

export default cartController;