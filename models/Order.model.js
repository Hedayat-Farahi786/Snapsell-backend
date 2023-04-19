const mongoose  = require("mongoose");
const Product = require('./Product.model');


const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    date: {
        type: String,
    },
    length: {
        type: Number,
    },
    total: {
        type: Number,
    },
    products: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }],
    orderType: {
        type: String,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    }
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;