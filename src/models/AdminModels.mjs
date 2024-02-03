const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    admin_id: { type: String, required: true, trim: true },
    username: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        trim:true,
    },
    image: String,
    phone: {
        type: String,
        default:'no number'
    },
    biography: {
        type: String,
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;