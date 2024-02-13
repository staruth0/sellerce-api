import Order from "../models/order.model.mjs";

const ordersController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).send("interna server error: creating error");
    }
  },

  getAParticularOrder: async (req, res) => {
    try {
      const { order_id } = req.params;

      const Order = await Order.findOne({order_id: order_id});
      res.status(200).json(Order);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error: fetching error");
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const Orders = await Order.find({});
      res.status(200).json(Orders);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error: fetching error");
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.findOneAndDelete({ order_id: id });

      res.status(200).json(deletedOrder);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error: deleting error");
    }
  },
  createOrder: async (req, res) => {},
};

export default ordersController;
