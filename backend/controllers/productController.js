const Product = require('../models/product');

// CREATE - Add a new product
exports.createProduct = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            imageUrl: req.file ? `uploads/${req.file.filename}` : '',
        };

        const product = new Product(productData);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create product', details: error.message });
    }
};

// UPDATE - Update a product by its ID
exports.updateProduct = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
        };

        if (req.file) {
            productData.imageUrl = `uploads/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, productData, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update product', details: error.message });
    }
};