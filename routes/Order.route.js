const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Order = require("../models/Order.model");



router.get("/", async (req, res, next) => {
    try {
      const results = await Order.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  });

// router.get("/:category", getProductsByCategory);

router.post("/", async (req, res, next) => {
    try {
    
        const order = new Order(req.body);
        const result = await order.save();
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
