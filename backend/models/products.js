const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
