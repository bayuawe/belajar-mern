import asyncHandler from "../middlewares/asyncHandler.js"; // Pastikan menambahkan .js jika menggunakan ES Modules

export const CreateProduct = asyncHandler(async (req, res, next) => {
  res.send("Create Product");
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
