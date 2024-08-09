const Product = require('../models/product');
const Category = require('../models/category');
const multer = require('multer');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
  
  const upload = multer({ storage }).single('image');
  
  const createProduct = async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;
      const imageUrl = req.file ? `uploads/${req.file.filename}` : '';
  
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
  
      const product = new Product({ name, description, price, category, stock, imageUrl });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(400).json({ message: err.message });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;
      const updateData = { name, description, price, category, stock };
  
      if (req.file) {
        updateData.imageUrl = `uploads/${req.file.filename}`;
      }
  
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
  
      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(product);
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(400).json({ message: err.message });
    }
  };
  

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  upload
};
