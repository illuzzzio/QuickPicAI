import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config(); // MUST be before using process.env

const router = express.Router();

// Cloudinary configuration using process.env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// for getting all the posts //
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Fetching posts failed" });
  }
});

// for creating a post //
router.route("/").post(async (req, res) => {
  try {
    // always remember req.body is where all the form data will be stored ..
    const { name, prompt, photo } = req.body;

    if (!name || !prompt || !photo) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // upload image to cloudinary
    const uploadResult = await cloudinary.uploader.upload(photo, {
      folder: "quickpicai",
      resource_type: "image",
    });

    const newPost = await Post.create({
      name,
      prompt,
      photo: uploadResult.secure_url, // we will store the url of the image that we get from cloudinary after uploading the image to cloudinary ..
    });

    res.status(201).json({ success: true, data: newPost });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Post creation failed",
    });
  }
});

export default router;


// after this i will again go to frontend and make a fetch request to this post route to create a post and store it in mongodb and cloudinary both.
