const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Customer = require("../models/Customer.model");



router.get("/", async (req, res, next) => {
    try {
      const results = await Customer.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  });

// router.get("/:category", getProductsByCategory);

router.post("/", async (req, res, next) => {
    try {
    
        const customer = new Customer(req.body);
        const result = await customer.save();
        res.send(result);
      
    } catch (error) {
      if (error.name === "ValidationEroor") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  });

// router.get("/:id", getSingleProduct);

// router.patch("/:id", updateSingleProduct);

// router.delete("/:id", deleteSingleProduct);


module.exports = router;
