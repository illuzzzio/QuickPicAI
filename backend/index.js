import express from "express"
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // this dotenv allows us to access our environment variables

const app = express();

app.use(cors()); // middleware 
app.use(express.json({limit: '50mb' }));

app.get("/", async (req,res) =>{
    res.send("Hello from QucikPic AI");
})