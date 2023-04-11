const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/:id", async (req, res, next) => {

    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.find({ "_id": req.params.id });

        if (!user) {
          next(createError(401, "User not found"));
          return;
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
          next(createError(401, "Password is incorrect"));
          return;
        }

        const token = jwt.sign({ id: user._id, email: user.username, storeName: user.storeName, mainColor: user.mainColor, currency: user.currency }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    } catch (err) {
        if (err.name === "ValidationEroor") {
            next(createError(422, err.message));
            return;
        }
        next(err);
    }
});

module.exports = router;

