const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/User.model");
// const multer = require("multer");

// const upload = multer({
//     dest: 'uploads/',
//     limits: {
//       fileSize: 1024 * 1024 * 5,
//     },
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//       } else {
//         cb(new Error('Invalid file type'));
//       }
//     },
//   });

router.post("/", async (req, res, next) => {
  try {
    const { username, password, storeName, mainColor, logo } = req.body;

    const user = new User({
      username,
      password,
      storeName,
      mainColor,
      // logo: req.file ? req.file.path : null,
      logo,
    });

    const result = await user.save();

    res.send({result});

  } catch (err) {
    if (err.name === "ValidationEroor") {
      next(createError(422, err.message));
      return;
    }
    next(err);
  }
});

module.exports = router;

