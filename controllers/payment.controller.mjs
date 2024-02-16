import httpStatus from "http-status";
import { makePayment} from "../services/payment.service.mjs";

const paymentController = {
  makePayment: async (req, res) => {
    try {
      const paymentSession = await createPayment(req.body); 
      res.status(httpStatus.OK).json({id:paymentSession.id});
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error making payment");
    }
  },
};

export default paymentController;