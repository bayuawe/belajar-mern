import asyncHandler from "../middlewares/asyncHandler.js"; // Pastikan menambahkan .js jika menggunakan ES Modules


//Create Order
export const CreateOrder = asyncHandler(async (req, res) => {

  return res.status(200).json({
    message: "success create product order", 
  });
});

//show all product order
export const AllOrder = asyncHandler(async (req, res) => {

  return res.status(200).json({
    message: "success show product order", 
  });
});

//show detail product order
export const detailOrder = asyncHandler(async (req, res) => {

  return res.status(200).json({
    message: "success show detail product order", 
  });
});

//show order by current user 
export const currentUserOrder = asyncHandler(async (req, res) => {

  return res.status(200).json({
    message: "success show current user product order", 
  });
});