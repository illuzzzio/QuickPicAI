import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import AIRoutes from "./routes/AIRoutes.js";
import connectDB from "./mongodb/db.js";

dotenv.config(); // this dotenv allows us to access our environment variables

const app = express();

app.use(cors()); // middleware 
app.use(express.json({ limit: '50mb' }));

app.use("/api/v1/posts", postRoutes); // this is the endpoint for our post routes
app.use("/api/v1/ai", AIRoutes); // this is the ednpoint for our AI routes file name basically 

app.get("/", async (req, res) => {
  res.send("Hello from QuickPic AI");
});

const startServer = async () => {
  app.listen(8000, () => {
    console.log("Server has been successfully started on http://localhost:8000");
  });
};
connectDB();
startServer();
