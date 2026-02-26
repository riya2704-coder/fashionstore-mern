import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/riya2";
  
const dbconnect = async () => {
    try{
        await mongoose.connect(URI);
        console.log("Database connected successfully...")
    }catch (error) {
        Console.error("Database connection Failed:", error );
    }
};

export default dbconnect;