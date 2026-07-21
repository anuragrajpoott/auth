import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined in environment variables.");
    }

    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL);

        console.log(`✅ MongoDB Connected: ${connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;