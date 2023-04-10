const createError = require("http-errors");
const mongoose = require("mongoose");
const Category = require("../models/Category.model");

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.find({}, { __v: 0 });
      res.send(categories);
    } catch (error) {
      console.log(error.message);
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const existingCategory = await Category.findOne({ name: req.name });

      if (existingCategory) {
        throw createError(400, "Category already created!");
      } else {
        const category = new Category(req.body);
        const result = await category.save();
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
  getSingleCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
      if (!category) {
        throw createError(404, "Category does not exist");
      }
      res.send(category);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Category id"));
        return;
      }
      next(error);
    }
  },
  updateSingleCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Category.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Category does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Category id"));
      }

      next(error);
    }
  },
  deleteSingleCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Category.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Category does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Category id"));
        return;
      }
      next(error);
    }
  },
};
