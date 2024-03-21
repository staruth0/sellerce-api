import mongoose from 'mongoose';
import toJSON from './plugins/toJSON.plugin.mjs';

const categorySchema = mongoose.Schema(
  { 
    categoryName: {
      type: String,
      required: true,
    },
    featuredProductName:{
      type:String,
      required:true,
    }
    ,
    featuredImage: {
      type: String,
      // required: true,
    },
    heroImage: {
      type: String,
      required: true,
    },
    design: {
      type: String,
      required: true,
    },
    performance: {
      type: String,
      required: true,
    },
    integration: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    heroTitle: {
      type: String,
      required: true,
    },
    heroDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

export default Category;
