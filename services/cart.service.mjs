import Cart from '../models/admin.model.mjs'

/**
 * Create a new cart
 * @param {object} cartData 
 * @returns {Promise<object>} 
 */

const createCart = async (cartData) => {
    try {
    const Cart = await Cart.create(cartData);
    return Cart;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating cart");
  }
}

/**
 * Create a new cart
 * @param {string} user_id
 * @returns {Promise<object>} 
 */

const getCardById = async (user_id) => {
    try {
    const cart = await Cart.findOne({user_id:user_id});
    return cart
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching cart");
  }
}

/**
 * update cart
 * @param {string} user_id
 * @param {object} datatoAdd
 * @returns {Promise<object>} 
 */

const updateAddCartItems = async (user_id,datatoAdd) => {
    try {
    const cartToUpdate = await Cart.findOne({ user_id: user_id });

    if (!cartToUpdate) {
      throw new Error(`Couldn't find cart`);
    }
    
    const { product_id, quantity, price } = datatoAdd;
    const newItem = { product_id, quantity, price };

    cartToUpdate.items.push(newItem);
    const updatedCart = await cartToUpdate.save();

    return updatedCart
  } catch (error) {
    console.error(error);
    throw new Error("Error updating cart");
  }
}

/**
 * update cart
 * @param {string} user_id
 * @param {string} product_id
 * @returns {Promise<object>} 
 */

const updateRemoveCartItems = async (user_id,product_id) => {
    try {
     const cartToUpdate = await Cart.findOne({user_id:user_id });

    if (!cartToUpdate) {
      throw new Error('Could not find cart');
    }

    cartToUpdate.items = cartToUpdate.items.filter(item => item.product_id !== product_id);
    const updatedCart = await cartToUpdate.save();

    return updatedCart
  } catch (error) {
    console.error(error);
    throw new Error("Error updating cart");
  }
}

/**
 * Update the quantity and price incart
 * @param {string} userId 
 * @param {string} productId 
 * @param {number} quantity 
 * @returns {Promise<object>} 
 */
const updateQuantityAndPriceOfItem = async (userId, productId, quantity) => {
  try {
    const cartToUpdate = await Cart.findOne({ user_id: userId });

    if (!cartToUpdate) {
      throw new Error("Could not find cart");
    }

    cartToUpdate.items.forEach((item) => {
      if (item.product_id === productId) {
        item.quantity = quantity;
        item.price = item.price * quantity;
      }
    });

    const updatedCart = await cartToUpdate.save();

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating items in cart");
  }
};

/**
 * Delete cart by ID
 * @param {string} userId 
 * @returns {Promise<object>} 
 */
const deleteCart = async (userId) => {
  try {
    const cartToDelete = await Cart.findOne({ user_id: userId });

    if (!cartToDelete) {
      throw new Error("Could not find cart");
    }

    const deletedCart = await Cart.findByIdAndDelete(cartToDelete._id);

    return deletedCart;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error deleting the cart.");
  }
};


export {createCart,getCardById,updateAddCartItems,updateRemoveCartItems,updateQuantityAndPriceOfItem, deleteCart}