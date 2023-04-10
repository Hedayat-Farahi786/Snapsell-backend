const express = require("express");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
require("./initDB")();

const SignupRoute = require("./routes/Singup.route");
app.use("/signup", SignupRoute);

const LoginRoute = require("./routes/Login.route");
app.use("/login", LoginRoute);


const UserRoute = require("./routes/User.route");
app.use("/user", UserRoute);

const ProductRoute = require("./routes/Product.route");
app.use("/products", ProductRoute);

const CategoryRoute = require("./routes/Category.route");
app.use("/categories", CategoryRoute);

// 404 Error handling
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
