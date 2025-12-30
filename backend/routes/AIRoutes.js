import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.send("Hello");
});

router.route("/").post( async (req,res)=>{
    try{
        const {prompt} = req.body; // we will use it on frontend side 

        const aiResponse = await openai.createImage({prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({photo:image});

    } catch(error){
        console.error(error);
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;
