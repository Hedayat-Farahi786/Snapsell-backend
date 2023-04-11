const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
  },
  mainColor: {
    type: String,
  },
  logo: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
