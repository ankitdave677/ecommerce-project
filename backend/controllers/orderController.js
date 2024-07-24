// Import the Order model
const Order = require('../models/order');

// CREATE - Add a new order
exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

// READ ALL - Retrieve all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};

// READ ONE - Retrieve a single order by its ID
exports.getOrderById = async (req, res) => {
    const _id = req.params.id;
    try {
        const order = await Order.findById(_id);
        if (!order) {
            return res.status(404).send();
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE - Update an order by its ID
exports.updateOrder = async (req, res) => {
    const _id = req.params.id;
    try {
        const order = await Order.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).send();
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

// DELETE - Delete an order by its ID
exports.deleteOrder = async (req, res) => {
    const _id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(_id);
        if (!order) {
            return res.status(404).send();
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};
