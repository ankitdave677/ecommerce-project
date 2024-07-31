const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// CRUD operations for categories
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/products', categoryController.getProductsByCategory); 
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
