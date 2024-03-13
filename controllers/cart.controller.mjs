// import Cart from '../models/cartModels';

// const Cartcontroller = {
//     createCart: async (req, res) => {
//         try {
//             const cartDetail = await Cart.create(req.body);
//             res.status(200).send(cartDetail);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('There was an error creating the cart.');
//         }
//     },

//     getCartDetails: async (req, res) => {
//         try {
//             const cartDetails = await Cart.find({});
//             res.status(200).send(cartDetails);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('There was an error fetching the cart details.');
//         }
//     },
// };

// export default Cartcontroller;