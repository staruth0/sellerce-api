import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./src/routes/productRoutes.mjs";
import connectToDatabase from './config/database.mjs';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const db = await connectToDatabase();
app.use(cors());
app.use(express.json());
app.use("/api/product",productRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});