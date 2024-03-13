import express from "express";
import favouriteController from '../../controllers/favourite.controller.mjs'
const favouriteRouter = express.Router()


favouriteRouter.post('/create/', favouriteController.createFavourite);

favouriteRouter.delete('/delete/:id',favouriteController.deleteFavourite)



export default favouriteRouter;