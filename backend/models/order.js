const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;