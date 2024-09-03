import asyncHandler from "../middlewares/asyncHandler.js"; // Pastikan menambahkan .js jika menggunakan ES Modules
import Product from "../Models/productModel.js";
import Order from "../Models/orderModel.js";


//Create Order
export const CreateOrder = asyncHandler(async (req, res) => {

  const { email, firstName, lastName, phone, cartItem } = req.body;

  if (!cartItem || cartItem.length < 1) {
    res.status(404);
    throw new Error("Keranjang kosong");
  }

  let orderItem = [];

  let total = 0;

  for (const cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product });
    if (!productData) {
      res.status(404);
      throw new Error("Id produk tidak ditemukan");
    }

    const { name, price, _id } = productData
    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id
    }
    orderItem = [...orderItem, singleProduct]

    //total
    total += cart.quantity * price
  }

  const order = await Order.create({
    itemDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id
  })

  return res.status(200).json({
    total,
    order,
    message: "Berhasil membuat order",
  })
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