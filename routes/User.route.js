const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      next(createError(401, "Unauthorized"));
      return;
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        next(createError(401, "Unauthorized"));
        return;
      }
  
      req.user = user;
      next();
    });
  }


router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Category id"));
        return;
      }
      next(error);
  }
});


router.patch("/:id", authenticateToken, async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const user = await User.findByIdAndUpdate(id, updates, options);
      if (!user) {
        throw createError(404, "User does not exist");
      }
      res.send(user);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid User id"));
      }

      next(error);
    }
  })


  router.delete("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw createError(404, "User does not exist");
      }
      res.send(user);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User id"));
        return;
      }
      next(error);
    }
  })

module.exports = router;
