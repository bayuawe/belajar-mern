import asyncHandler from "../middlewares/asyncHandler.js"; // Pastikan menambahkan .js jika menggunakan ES Modules
import Product from "../Models/productModel.js";

export const CreateProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
});

export const AllProduct = asyncHandler(async (req, res, next) => {
  res.send("All Product");
});

export const detailProduct = asyncHandler(async (req, res, next) => {
  res.send("detail Product");
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  res.send("Update Product");
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  res.send("Delete Product");
});
export const Fileupload = asyncHandler(async (req, res, next) => {
  res.send("File Upload Product");
});
