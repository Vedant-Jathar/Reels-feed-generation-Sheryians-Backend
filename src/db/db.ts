import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI as string)
            .then(() => {
                console.log("Connected to the database.");
            })
    } catch (error) {
        console.log("Error connecting to the database", error);
    }
}