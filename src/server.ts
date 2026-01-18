import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

const MONGO_URL = process.env.MONGO_URL as string;
const PORT = process.env.PORT ?? 3003;

mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("✅ MongoDB connection succeeded");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });