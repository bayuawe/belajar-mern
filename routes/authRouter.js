import express from "express";
import { registerUser } from "../controllers/authController.js";


const router = express.Router();

//post /api/v1/auth/register
router.post("/register", registerUser);

//post /api/v1/auth/login
router.post("/login", (req, res) => {
  res.send("Login");
});

//get /api/v1/auth/logout
router.get("/logout", (req, res) => {
  res.send("Logout");
});

//get /api/v1/auth/getUser
router.get("/getuser", (req, res) => {
  res.send("Get Current User");
});
export default router;
