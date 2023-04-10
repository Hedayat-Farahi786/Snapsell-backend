const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");
const Category = require("../models/Category.model");
const Product = require("../models/Product.model");
const { getAllCategories, createCategory, getSingleCategory, updateSingleCategory, deleteSingleCategory } = require("../controllers/Category.controller");

router.get("/", getAllCategories);

router.post("/", createCategory);

router.get("/:id", getSingleCategory);

router.patch("/:id", updateSingleCategory);

router.delete("/:id", deleteSingleCategory);

module.exports = router;
