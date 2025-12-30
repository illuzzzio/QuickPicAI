import mongoose from "mongoose";

const connectDB =async ()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI);
        console.log("database connection established successfully")

    } catch(error){
        console.error("failed to connect to the database")
    }
}

export default connectDB;