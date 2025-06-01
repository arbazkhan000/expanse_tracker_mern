import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("Please provide MONGODB_URI in the .env file");
}

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Mongodb connect error", error);
        process.exit(1);
    }
}

export default connectDB;
