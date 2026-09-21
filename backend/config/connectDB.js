import mongoose from "mongoose";


export const connectDB = async () => {

   try{
     // MongoDB connection
    await mongoose.connect(process.env.MONGODB_URI); 
      console.log("Connected to MongoDB successfully...")
   }catch(err){
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process with failure
   }
}