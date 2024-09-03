import asyncHandler from "../middlewares/asyncHandler.js"; // Pastikan menambahkan .js jika menggunakan ES Modules
import Product from "../Models/productModel.js";

export const CreateProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
});

export const AllProduct = asyncHandler(async (req, res) => {
  //Req query
  const queryObject = { ...req.query };

  //Menghilangkan properti yang tidak diperlukan
  const excludeFields = ["page", "limit", "name"];
  excludeFields.forEach((element) => delete queryObject[element]);

  let query 
  
  if (req.query.name) {
    query = Product.find({
      name: {
        $regex: req.query.name, $options: "i"
      }
    })
  }else{
    query = Product.find(queryObject);
  }

  //Pagination
  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 30;
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  let countProduct = await Product.countDocuments();

  if (req.query.page) {
    if (skipData >= countProduct) {
      return res.status(404).json({
        message: "page not found",
      });
    }
  }

  const dataProduct = await query;

  return res.status(201).json({
    message: "success get all product",
    dataProduct,
    count: countProduct
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
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      message: "Please upload a file",
    });
  }
  const imageFileName = file.filename;
  const imageFilePath = `/uploads/${imageFileName}`;

  return res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    imageFilePath,
  });
});
