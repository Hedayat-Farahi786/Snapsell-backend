const mongoose  = require("mongoose");
const Category = require('./Category.model')


const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;