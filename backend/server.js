import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoute.js";
import subscriptionRoute from "./routes/subscriptionRoute.js";
import { connectDB } from "./config/connectDB.js";
dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/users", authRoutes);
app.use("/api/subscription", subscriptionRoute);



const port = process.env.PORT || 5000;
connectDB()
app.listen(port, () => console.log(`Listening on port ${port}...`));