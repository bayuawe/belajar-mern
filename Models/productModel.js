import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value !== "";
      },
      message: "Product name is required and must be unique",
    },
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  description: {
    type: String,
    required: [true, "Product price is required"],
  },
  image: {
    type: String,
    default: "null",
  },
  category: {
    type: String,
    required: [true, "Product price is required"],
    unique: ["Sepatu", "Pakaian", "Makanan", "Elektronik"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
