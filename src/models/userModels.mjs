import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: {
        type: true,
        required: true,
        trim:true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    town: {
        type: String,
        trim: true,
        default:'no town'
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        default:'no number',
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim:true,
    }
},{ timestamps: true })

const User = mongoose.model('User', userSchema);
export default User;