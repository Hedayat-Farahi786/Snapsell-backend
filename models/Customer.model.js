const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  totalOrders: {
    type: Number,
  },
});


const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
