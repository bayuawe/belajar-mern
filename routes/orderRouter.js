import express from "express";
import { protectedMiddleware, adminMiddleware } from "../middlewares/authMidleware.js";
import { CreateOrder, AllOrder, detailOrder, currentUserOrder } from "../controllers/orderController.js";

const router = express.Router();

//CRUD Order

//Create Data Order
//POST /api/v1/order
//middleware can access by user auth
router.post("/", protectedMiddleware, CreateOrder);

//All Data Order
//GET /api/v1/order
//middleware can access by user admin
router.get("/", protectedMiddleware, adminMiddleware, AllOrder);

//Get Detail Order
//GET /api/v1/order/:id
//middleware can access by user admin
router.get("/:id", protectedMiddleware, adminMiddleware, detailOrder);

//List Order by current user
//GET /api/v1/order/current/user
//middleware can access by user auth
router.get ("/current/user", protectedMiddleware, currentUserOrder);

export default router;
