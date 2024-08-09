const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts, getProduct, upload } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', upload, createProduct);
router.put('/:id', upload, updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;
