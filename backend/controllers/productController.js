const Product = require('../models/product');

// CREATE - Add a new product
exports.createProduct = async (req, res) => {
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : '', 
    };
    const product = new Product(productData);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

// UPDATE - Update a product by its ID
exports.updateProduct = async (req, res) => {
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
    };

    if (req.file) {
        productData.imageUrl = req.file.path; 
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};
