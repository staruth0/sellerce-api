import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required:true
    },
    Product_id: {
        type: String,
        required:true
    }
},{ timestamps: true })

const Favourite = mongoose.model('Favourite', favouriteSchema);
export default Favourite;