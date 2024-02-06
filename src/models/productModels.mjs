import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    overview: [
      {
        heading: { type: String, required: true },
        explanation: { type: String, required: true },
      },
    ],
    long_description: {
      type: String,
      required: true,
    },
  },
  year_introduced: {
    type: Date,
    required: true,
  },
  capacity: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity_in_stock: {
    type: Number,
    required: true,
  },
  Last_day_updated: {
    type: Date,
    required: true,
  },
  Who_updated: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  featured: {
    answer: {
      type: Boolean,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
      default: function () {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);
        return currentDate;
      },
    },
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  variants: [
      {
      image: [{type: String, required: true }],
      color: { type: String, required: true },
      quantity_in_stock: { type: String },     
    },
    ],
  other_media:[String],
},{ timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
