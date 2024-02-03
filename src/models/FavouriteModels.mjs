const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required:true
    },
    Product_id: {
        type: String,
        required:true
    }
})

const Favourite = mongoose.model('Favourite', favouriteSchema);
module.exports = Favourite;