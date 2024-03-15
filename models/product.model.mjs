// import { number } from "joi";
import mongoose from "mongoose";
import toJSON from './plugins/toJSON.plugin.mjs';
import paginate from './plugins/paginate.plugin.mjs'
// Define the common options for all product schemas
const commonOptions = {
  discriminatorKey: 'category', // Field name to determine the category
  collection: 'products', // Collection name for all products
};

const baseproductSchema = new mongoose.Schema(
    {
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
      quantity_in_stock: {
        type: Number,
        required: true,
      },
      Last_day_updated: {
        type: Date,
        required: true,
        default: Date.now
      },
      Who_updated: {
        type: String,
        required: true,
      },
      featured: {
        answer: {
          type: Boolean,
          required: true,
          default:false
        },
        hero_display:{
          answer:{
            type:Boolean,
            default:false
          }
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
      // variants: [mongoose.Schema.Types.Mixed], // Mixed type for dynamic schema,
      other_media:[String],
      timeAdded:{
        type:Date,
        trim:true,
        default: Date.now
      },
    },
    commonOptions
  );

// Define the discriminator keys and schemas for Apple product categories
const appleCategorySchemas = {
  phone: new mongoose.Schema({
    // Phone-specific fields
    
    variants: [
      {
        model: {
          type: String,
          required: true,
          trim: true,
        },
        year_introduced: {
          type:String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        salescount:{
          type:Number,
          default:0
        },
        storageCapacity: { 
          type: String, 
          required: true 
        },
        internalMemory:{
          type: String,
          required:true
        },
        batteryLive:{
          type:String,
          required:true
        },
        screenResolution:{
          type:String,
          required:true
        },
        cameraModel:{
          type:String,
          default:'not provided'
        },
        osVersion:{
          type:String,
          default:'not provided'
        },
        otherVariant: [
          {
            color:{ 
              type: String, 
              required: true 
            },
            image: [
              { 
                type: String, 
                required: true 
              }
            ],
            color_quantity_in_stock: { 
              type: Number, 
              required: true 
            },

          }
        ],
        model_quantity_in_stock: { type: Number, required: true },
      },
    ],
  }),
  watch: new mongoose.Schema({
    // Watch-specific fields
    variants: [
      {
        model: {
          type: String,
          required: true,
          trim: true,
        },
        year_introduced: {
          type:String,
          required: true,
        },
        strap_material: { 
          type: String, 
          required: true 
        },
        price: {
          type: Number,
          required: true,
        },
        sales_count:{
          type:Number,
          default:0
        },
        otherVariant: [
          {
            color:{ 
              type: String, 
              required: true 
            },
            image: [
              { 
                type: String, 
                required: true 
              }
            ],
            color_quantity_in_stock: { 
              type: Number, 
              required: true 
            },

          }
        ],
        model_quantity_in_stock: { type: Number, required: true },
      },
    ],
  }),
  tablet: new mongoose.Schema({
    // Tablet-specific fields
    variants: [
      {
        model: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
        },
        year_introduced: {
          type: Number,
          required: true,
        },
        salescount:{
          type:Number,
          default:0
        },
        storageCapacity: { 
          type: String, 
          required: true 
        },
        internalMemory:{
          type: String,
          required:true
        },
        batteryLive:{
          type:String,
          required:true
        },
        screenResolution:{
          type:String,
          required:true
        },
        cameraModel:{
          type:String,
          default:'not provided'
        },
        osVersion:{
          type:String,
          default:'not provided'
        },
        otherVariant: [
          {
            color:{ 
              type: String, 
              required: true 
            },
            image: [
              { 
                type: String, 
                required: true 
              }
            ],
            color_quantity_in_stock: { 
              type: Number, 
              required: true 
            },

          }
        ],
        model_quantity_in_stock: { 
          type: Number, 
          required: true 
        },
      },
    ],
  }),
  laptop: new mongoose.Schema({
    // Laptop-specific fields
    variants: [
      {
        model: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
        },
        year_introduced: {
          type:String,
          required: true,
        },
        salescount:{
          type:Number,
          default:0
        },
        storageCapacity: { 
          type: String, 
          required: true 
        },
        internalMemory:{
          type: String,
          required:true
        },
        batteryLive:{
          type:String,
          required:true
        },
        screenResolution:{
          type:String,
          required:true
        },
        cameraModel:{
          type:String,
          default:'not provided'
        },
        osVersion:{
          type:String,
          default:'not provided'
        },
        otherVariant: [
          {
            color:{ 
              type: String, 
              required: true 
            },
            image: [
              { 
                type: String, 
                required: true 
              }
            ],
            color_quantity_in_stock: { 
              type: Number, 
              required: true 
            },

          }
        ],
        model_quantity_in_stock: { 
          type: Number, 
          required: true 
        },
      },
    ],
  }),
  // Add more categories as needed
};

// add plugin that converts mongoose to json
baseproductSchema.plugin(toJSON);
baseproductSchema.plugin(paginate);

// Create the base product model
const BaseProduct = mongoose.model(/*model name*/'Product', baseproductSchema,/*collection name*/'products');
// Create discriminator models for each Apple product category
const ApplePhone = BaseProduct.discriminator('ApplePhone', appleCategorySchemas.phone);
const AppleWatch = BaseProduct.discriminator('AppleWatch', appleCategorySchemas.watch);
const AppleTablet = BaseProduct.discriminator('AppleTablet', appleCategorySchemas.tablet);
const AppleLaptop = BaseProduct.discriminator('AppleLaptop', appleCategorySchemas.laptop);

export { BaseProduct, ApplePhone, AppleWatch, AppleTablet, AppleLaptop };
