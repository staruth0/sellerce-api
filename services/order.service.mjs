import Order from "../models/order.model.mjs";

/**
 * Create a new order
 * @param {object} orderData 
 * @returns {Promise<object>} 
 */
const createOrder = async (orderData) => {
  try {
    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating order"); 
  }
};

/**
 * Get order by order_id
 * @param {string} order_id 
 * @returns {Promise<object>} 
 */
const getAParticularOrder = async (order_id) => {
  try {
    const order = await Order.findOne({ order_id });
    return order;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching order");
  }
};

/**
 * Get all orders
 * @returns {Promise<Array>} 
 */
const getAllOrders = async () => {
  try {
    const orders = await Order.find({});
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching orders");
  }
};

/**
 * Delete order order_id
 * @param {string} order_id 
 * @returns {Promise<object>} 
 */
const deleteOrder = async (order_id) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ order_id });
    return deletedOrder;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting order");
  }
};

export { createOrder, getAParticularOrder, getAllOrders, deleteOrder };