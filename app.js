import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;



import authRouter from "./routes/authRouter.js";

//Parent route
app.use("/api/v1/auth", authRouter);

//server
app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
});

//connect to db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));