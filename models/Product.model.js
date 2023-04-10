const mongoose  = require("mongoose");
const Category = require('./Category.model')


const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    info: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    product_image: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;