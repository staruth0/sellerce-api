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
    const { user_id } = req.params;
    const cartToUpdate = await Cart.findOne({ user_id: user_id });

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
    const { user_id, product_id } = req.params;
    const cartToUpdate = await Cart.findOne({user_id:user_id });

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
    
updateQuantityAndPriceOfItem: async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
    const cartToUpdate = await Cart.findOne({user_id:user_id });

    if (!cartToUpdate) {
      return res.status(404).send('Could not find cart');
    }
    const { quantity } = req.body;

    cartToUpdate.items.forEach(item => {
      if (item => item.product_id === product_id) {
        item.quantity = quantity;
        item.price = item.price * quantity;
       }
    });;
    
    const updatedCart = await cartToUpdate.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating items in cart');
  }
    },

 deleteCart: async (req, res) => {
        try {
          const { user_id } = req.params;
          const cardtodelete = await Cart.findOne({ user_id: user_id });
        
          if (!cardtodelete) {
               return res.status(404).send('Could not find cart');
           }

          const uid = cardtodelete._id;
          const deletedCart = await Cart.findByIdAndDelete( uid );
            
          res.status(200).json({
            message: 'success deleting cart',
            deletedCart,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('There was an error deleting the cart.');
        }
    },

};

export default cartController;