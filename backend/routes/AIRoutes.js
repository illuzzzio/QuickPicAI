import express from "express";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();
const router = express.Router();
const client = new InferenceClient(process.env.HF_TOKEN);

// Best models list (in priority order)
const models = [
  "stabilityai/stable-diffusion-xl-base-1.0",
  "stabilityai/sdxl-turbo",
  "runwayml/stable-diffusion-v1-5"
  // "black-forest-labs/FLUX.1-dev" // premium — enable if you have inference provider billing
];

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    let imageBlob = null;
    let usedModel = "";

    // Try each model until one succeeds
    for (const model of models) {
      try {
        usedModel = model;
        imageBlob = await client.textToImage({
          model,
          inputs: prompt,
          provider: "hf-inference"
        });
        break; // success — stop trying
      } catch (err) {
        console.warn(`Model ${model} failed, trying next…`);
      }
    }

    if (!imageBlob) {
      return res.status(500).json({ error: "All models failed" });
    }

    const buffer = Buffer.from(await imageBlob.arrayBuffer());
    const base64Image = buffer.toString("base64");

    res.status(200).json({
      model: usedModel,
      photo: base64Image,
    });

  } catch (error) {
    console.error("HF IMAGE ERROR:", error);
    res.status(500).json({ error: error.message || "Image gen failed" });
  }
});

export default router;// better model 


// creepy model - free code //
// import express from "express";
// import * as dotenv from "dotenv";
// import { HfInference } from "@huggingface/inference";

// dotenv.config();

// const router = express.Router();

// const hf = new HfInference(process.env.HF_TOKEN);

// router.get("/", (req, res) => {
//   res.send("Hello");
// });

// router.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Generate image
//     const imageBlob = await hf.textToImage({
//       model: "black-forest-labs/FLUX.1-dev", // BEST free model
//       inputs: prompt,
//     });

//     // Convert Blob → Base64 (to match your frontend)
//     const buffer = Buffer.from(await imageBlob.arrayBuffer());
//     const base64Image = buffer.toString("base64");

//     res.status(200).json({
//       photo: base64Image,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Image generation failed",
//     });
//   }
// });

// export default router;
// migrated from OpenAI to Hugging Face API




// import express from "express";
// import * as dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.get("/", (req, res) => {
//   res.send("Hello");
// });

// router.route("/").post( async (req,res)=>{
//     try{
//         const {prompt} = req.body; // we will use it on frontend side  as request body is our frontend part 

//         const aiResponse = await openai.images.generate({
//           prompt,
//   model: "gpt-image-1",
 
//   size: "1024x1024"
// });

//         const image = aiResponse.data.data[0].b64_json;

//         res.status(200).json({photo:image});// this is just a format for the json respone , please dont be confuse , for mwhere this photo:image comes from..

//     } catch(error){
//         console.error(error);
//         res.status(500).send(error?.response.data.error.message)
//     }
// })

// export default router;


// after the main AI API route is created , we need to fetch the route on frontend as a request in pages/CreatePost.jsx file.




// // Programmatically interact with the Hub

// await createRepo({
//   repo: { type: "model", name: "my-user/nlp-model" },
//   accessToken: HF_TOKEN
// });

// await uploadFile({
//   repo: "my-user/nlp-model",
//   accessToken: HF_TOKEN,
//   // Can work with native File in browsers
//   file: {
//     path: "pytorch_model.bin",
//     content: new Blob(...)
//   }
// });

// // Use all supported Inference Providers!

// await inference.chatCompletion({
//   model: "meta-llama/Llama-3.1-8B-Instruct",
//   provider: "sambanova", // or together, fal-ai, replicate, cohere …
//   messages: [
//     {
//       role: "user",
//       content: "Hello, nice to meet you!",
//     },
//   ],
//   max_tokens: 512,
//   temperature: 0.5,
// });

// await inference.textToImage({
//   model: "black-forest-labs/FLUX.1-dev",
//   provider: "replicate",
//   inputs: "a picture of a green bird",
// });

// // and much more…