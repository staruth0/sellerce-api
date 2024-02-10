import Favourite from "../models/favourite.model.mjs";

const favouriteController = {
    
    createFavourite: async (req, res) => {
        try {
            const favouriteData = await Favourite.create(req.body);
            res.status(201).json(favouriteData);
        } catch (error) {
            console.error(error);
            res.status(500).send('error creating favourite')
        }
    },

    deleteFavourite: async (req, res) => {
        try {
            const { id } = req.params
            const result = await Favourite.findByIdAndDelete(id);

            result ? res.status(200).send('successfully deleted') : res.status(404).send('no favourite found')
            
        } catch (error) {
            console.error(error);
            res.status(500).send('error deleting favourite')
        }
    }

}
 
export default favouriteController;