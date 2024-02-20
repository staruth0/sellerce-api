import Payment from "../models/payment.model.mjs";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * make payment
 * @param {object} paymentData
 * @returns {object}
 */
const makePayment = async (paymentData) => {
  try {
    const { items } = paymentData;
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product_id,
          },
          unit_amount: Math.floor(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure",
    });

    return session;
  } catch (error) {
    console.error(error);
    throw new Error("Error processing payment");
  }
};

export { makePayment};
