import asyncHandler from "../middlewares/asyncHandler.js"; // Pastikan menambahkan .js jika menggunakan ES Modules
import Product from "../Models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const CreateProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "success create product",
    data: newProduct,
  });
});

export const AllProduct = asyncHandler(async (req, res) => {
  const queryObject = { ...req.query };

  // Menghilangkan properti yang tidak diperlukan
  const excludeFields = ["page", "limit", "name"];
  excludeFields.forEach((element) => delete queryObject[element]);

  let query = Product.find();

  // Filter berdasarkan nama jika ada
  if (req.query.name) {
    query = query.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });
  }

  // Filter berdasarkan kategori jika ada
  if (req.query.category) {
    query = query.find({ category: req.query.category });
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 10; // Batas produk per halaman diubah menjadi 10
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  const countProduct = await Product.countDocuments(queryObject);

  if (req.query.page) {
    if (skipData >= countProduct) {
      return res.status(404).json({
        message: "page not found",
      });
    }
  }

  const data = await query;
  const totalPage = Math.ceil(countProduct / limitData);

  return res.status(201).json({
    message: "success get all product",
    data,
    pagination: {
      totalPage,
      page,
      totalProduct: countProduct,
    },
  });
});

//detail product
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
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "uploads",
      allowed_formats: ["jpg", "png"],
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to upload image",
          error: err.message,
        });
      }
      res.json({
        message: "success upload image",
        url: result.secure_url,
      });
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
});
