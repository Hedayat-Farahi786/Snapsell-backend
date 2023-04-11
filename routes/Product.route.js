const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
//   const upload = multer({ storage: storage })

const Product = require("../models/Product.model");
const { getAllProducts, createProduct, getSingleProduct, updateSingleProduct, deleteSingleProduct, getProductsByCategory } = require("../controllers/Product.controller");

router.get("/", getAllProducts);

router.get("/:category", getProductsByCategory);

router.post("/", createProduct);

router.get("/:id", getSingleProduct);

router.patch("/:id", updateSingleProduct);

router.delete("/:id", deleteSingleProduct);


module.exports = router;
