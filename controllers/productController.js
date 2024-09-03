import asyncHandler from "../middlewares/asyncHandler.js"; // Pastikan menambahkan .js jika menggunakan ES Modules
import Product from "../Models/productModel.js";

export const CreateProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
});

export const AllProduct = asyncHandler(async (req, res, next) => {
  const dataProduct = await Product.find();

  return res.status(201).json({
    message: "success get all product",
    dataProduct,
  });
});

export const detailProduct = asyncHandler(async (req, res, next) => {
  const paramsId = req.params.id;
  const productData = await Product.findById(paramsId);

  if (!productData) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.status(200).json({
    message: "success get detail product",
    data: productData,
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const paramId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(paramId, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(200).json({
    message: "success update product",
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const paramId = req.params.id;
  await Product.findByIdAndDelete(paramId);
  return res.status(200).json({
    message: "success delete product",
  });
});

export const Fileupload = asyncHandler(async (req, res, next) => {
  res.send("File Upload Product");
});
