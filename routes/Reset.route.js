const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

router.post("/:id", async (req, res, next) => {

    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.find({ "_id": req.params.id });

        if (!user) {
            next(createError(401, "User not found"));
            return;
        }

        res.send(user);

    } catch (err) {
        if (err.name === "ValidationEroor") {
            next(createError(422, err.message));
            return;
        }
        next(err);
    }
});

module.exports = router;

