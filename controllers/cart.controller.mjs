import Cart from '../models/cart.model.mjs';

const cartController = {
    createCart: async (req, res) => {
        try {
            const cartDetail = await Cart.create(req.body);
            res.status(200).send(cartDetail);
        } catch (error) {
            console.error(error);
            res.status(500).send('There was an error creating the cart.');
        }
    },
    

    getCartDetail: async (req, res) => {
        try {
            const { user_id } = req.params;
            const cartDetails = await Cart.findOne({user_id:user_id});
            res.status(200).send(cartDetails);
        } catch (error) {
            console.error(error);
            res.status(500).send('There was an error fetching the cart detail.');
        }
    },

updateAddCartItems: async (req, res) => {
  try {
    const { cart_id } = req.params;
    const cartToUpdate = await Cart.findOne({ cart_id });

    if (!cartToUpdate) {
      return res.status(404).send('Could not find cart');
    }

    const { product_id, quantity, price } = req.body;
    const newItem = { product_id, quantity, price };

    cartToUpdate.items.push(newItem);
    const updatedCart = await cartToUpdate.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating items in cart');
  }
}
    ,

updateRemoveCartItems: async (req, res) => {
  try {
    const { cart_id, product_id } = req.params;
    const cartToUpdate = await Cart.findOne({ cart_id });

    if (!cartToUpdate) {
      return res.status(404).send('Could not find cart');
    }

    cartToUpdate.items = cartToUpdate.items.filter(item => item.product_id !== product_id);
    const updatedCart = await cartToUpdate.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating items in cart');
  }
    },

 deleteCart: async (req, res) => {
        try {
            const { cart_id } = req.params;
            const deletedCart = await Cart.findByIdAndDelete( cart_id );
            
            res.status(200).send('success in deleting card');
        } catch (error) {
            console.error(error);
            res.status(500).send('There was an error deleting the cart.');
        }
    },

};

export default cartController;