import Product from '../models/productModels.mjs';
const ProductController = {
  // Example: Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Example: Create a new product
  createProduct: async (req, res) => {
    const {product_id, name, description, year_introduced, capacity, price, quantity_in_stock, who_updated, model, category, featured, variants, othermedia } = req.body;

    try {
      const newProduct = new Product({
        product_id,
        name,
        description,
        year_introduced,
        capacity,
        price,
        quantity_in_stock,
        who_updated,
        model,
        category,
        featured,
        variants,
        othermedia
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Add other CRUD operations as needed
};

export default ProductController;
