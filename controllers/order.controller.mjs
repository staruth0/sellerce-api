import httpStatus from "http-status";
import { createOrder,getAParticularOrder,getAllOrders,deleteOrder} from "../services/ordersService.js";

const ordersController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = await createOrder(req.body);
      res.status(httpStatus.CREATED).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error: Creating error");
    }
  },

  getAParticularOrder: async (req, res) => {
    try {
      const { order_id } = req.params;
      const order = await getAParticularOrder(order_id);

      if (!order) {
        res.status(httpStatus.NOT_FOUND).send(`Couldn't find order with order_id: ${order_id}`);
        return;
      }
      res.status(httpStatus.OK).json(order);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error: Fetching error");
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await getAllOrders();
      res.status(httpStatus.OK).json(orders);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error: Fetching error");
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await getAParticularOrder(id);

      if (!order) {
        res.status(httpStatus.NOT_FOUND).send(`Couldn't find order with order_id: ${id}`);
        return;
      }
      const deletedOrder = await deleteOrder(id);
      res.status(httpStatus.OK).json(deletedOrder);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error while deleting order");
    }
  },
};

export default ordersController;