import Product from '../models/productModels.mjs';
const ProductController = {
  // Example: Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
          success: true,
          message: 'All Products retrieved successfully',
          data: products
        }  
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          message: 'Failed to create the product'
        });
    }
  },

  // Example: Create a new product
  createProduct: async (req, res) => {
    const {product_id, name, description, year_introduced,Last_day_updated,capacity, price, quantity_in_stock, Who_updated, model, category, featured, variants, othermedia,timeAdded
    } = req.body;

    try {
      const newProduct = new Product({
        product_id,
        name,
        description,
        year_introduced,
        capacity,
        price,
        quantity_in_stock,
        Last_day_updated,
        Who_updated,
        model,
        category,
        featured,
        variants,
        othermedia,
        timeAdded
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: savedProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to create the product'
      });
    }
  },
  //retrieve product by ID
  getProductById: async (req,res) => {
    try {
      const productid=req.query.id;
      const filter={product_id:productid};
      const product=await Product.findOne(filter);
      res.status(200).json({
        success:true,
        message:`product retrieved successfully`,
        data:product
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        success: false,
        error:"internal server error",
        message:"unable to retrive the product"
      })
    }


  },

deleteProduct:async (req, res) => {
  try {
    // Extract product_id from request parameters
    const productId = req.params.id;

    // Find and delete the product by product_id
    const deletedProduct = await Product.findOneAndDelete({ product_id: productId });

    // Check if the product was found and deleted successfully
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found.`,
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: `Product with ID ${productId} deleted successfully.`,
      data: deletedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Unable to delete the product.",
    });
  }
},

  // Add other CRUD operations as needed
};

export default ProductController;
