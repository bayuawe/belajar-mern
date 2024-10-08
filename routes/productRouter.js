import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMidleware.js";
import {
  CreateProduct,
  AllProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  Fileupload,
} from "../controllers/productController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

//CRUD Product

//Create Data Product
//POST /api/v1/product
//middleware admin
router.post("/", protectedMiddleware, adminMiddleware, CreateProduct);

//All Data Product
//GET /api/v1/product
router.get("/", AllProduct);

//Create Data Product
//GET /api/v1/product/:id
router.get("/:id", detailProduct);

//Update Data Product
//PUT /api/v1/product/:id
//middleware admin
router.put("/:id", protectedMiddleware, adminMiddleware, updateProduct);

//Delete Data Product
//DELETE /api/v1/product/:id
//middleware admin
router.delete("/:id", protectedMiddleware, adminMiddleware, deleteProduct);

//File Upload Data Product
//POST /api/v1/product/file-upload
//middleware admin
router.post(
  "/file-upload",
  protectedMiddleware,
  adminMiddleware,
  upload.single("image"),
  Fileupload
);

export default router;
