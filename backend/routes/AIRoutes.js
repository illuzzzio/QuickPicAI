import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "AI route working" });
});

export default router;
