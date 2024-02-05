import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    product_id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String,
        required: true 
    },
    description: {
      overview: [
        { heading: String, 
            explanation: String 
        }
    ],
      longDescription: String
    },
    year_introduced: { 
        type: Number, 
        required: true 
    },
    capacity: { 
        type: String, 
        required: true 
    },
    price: {
         type: Number, 
        required: true 
    },
    quantity_in_stock: { 
        type: Number, 
        required: true 
    },
    last_day_updated: { 
        type: Date, 
        default: Date.now 
    },
    who_updated: { 
        type: String, 
        required: true 
    },
    model: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    featured: { answer: Boolean, 
        caption: String, 
        time: Number 
    },
    variants: [
      {
        color: String,
        quantity_in_stock: Number,
        images: [String]
      }
    ],
    othermedia: [String],
    timeAdded: {
        type: Date,
        default: Date.now, // Example default value
      }
  });
  
  const Product = mongoose.model('Product', productSchema);

  export default Product;