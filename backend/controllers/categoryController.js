// Import the Category model
const Category = require('../models/category');

// CREATE - Add a new category
exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

// READ ALL - Retrieve all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

// READ ONE - Retrieve a single category by its ID
exports.getCategoryById = async (req, res) => {
    const _id = req.params.id;
    try {
        const category = await Category.findById(_id);
        if (!category) {
            return res.status(404).send();
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE - Update a category by its ID
exports.updateCategory = async (req, res) => {
    const _id = req.params.id;
    try {
        const category = await Category.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).send();
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

// DELETE - Delete a category by its ID
exports.deleteCategory = async (req, res) => {
    const _id = req.params.id;
    try {
        const category = await Category.findByIdAndDelete(_id);
        if (!category) {
            return res.status(404).send();
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};
