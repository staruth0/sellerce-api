import mongoose from 'mongoose';
import toJSON from './plugins/toJSON.plugin.mjs';

const heroSectionSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    slide_image: {
      type: String,
    //   required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    slide_position: {
      type: Number,
      required: true,
    },
    category_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
heroSectionSchema.plugin(toJSON);

const HeroSection = mongoose.model('HeroSection', heroSectionSchema);

export default HeroSection;