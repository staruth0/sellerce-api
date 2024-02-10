import mongoose  from "mongoose";

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
    },
    role: {
        type: String,
        required: true,
        default: "admin",
        enum:['super admin', 'admin']
    },
    previledges:[String],
},{ timestamps: true })

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;