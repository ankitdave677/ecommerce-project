const Product = require('../models/products');

// CREATE - Add a new product
exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

// READ ALL - Retrieve all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

// READ ONE - Retrieve a single product by its ID
exports.getProductById = async (req, res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE - Update a product by its ID
exports.updateProduct = async (req, res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

// DELETE - Delete a product by its ID
exports.deleteProduct = async (req, res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(_id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};
