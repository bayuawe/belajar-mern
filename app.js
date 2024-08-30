import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Parent route
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

//server
app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
});

//connect to db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));