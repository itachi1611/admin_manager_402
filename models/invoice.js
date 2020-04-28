const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    purchased_date: {
        type: Date,
        default: Date.now()
    },
    shipping_address: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    payment_status: {
        type: Number,
        default: 0
    },
    product_name: {
        type: String,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    }
});

//Export model
module.exports = mongoose.model('invoice', invoiceSchema);