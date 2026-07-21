import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in environment variables.");
        }

        const connection = await mongoose.connect(process.env.DATABASE_URL);

        console.log(
            `✅ MongoDB Connected: ${connection.connection.host}`
        );
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;