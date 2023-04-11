const createError = require("http-errors");
const mongoose = require("mongoose");
const Product = require("../models/Product.model");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const results = await Product.find({}, { __v: 0 }).populate('category');
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getProductsByCategory: async (req, res, next) => {
    try {
      const results = await Product.find({category: req.params.category}, { __v: 0 }).populate('category');
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const existingProduct = await Product.findOne({ name: req.body.name });
      if (existingProduct) {
        throw createError(400, "Product already created!");
      } else {
        const { name, info, price, product_image, category } = req.body;

        const item = new Product({
          name,
          info,
          price,
          // product_image: req.file ? req.file.path : null,
          product_image,
          category,
        });
    
        const product = new Product(item);
        const result = await product.save();
        res.send(result);
      }
    } catch (error) {
      if (error.name === "ValidationEroor") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  getSingleProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id).populate('category');
      if (!product) {
        throw createError(404, "Product does not exist");
      }
      res.send(product);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product id"));
        return;
      }
      next(error);
    }
  },
  updateSingleProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Product.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Product does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Product id"));
      }

      next(error);
    }
  },
  deleteSingleProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Product.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Product does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product id"));
        return;
      }
      next(error);
    }
  },
};
