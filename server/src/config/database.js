import mongoose from "mongoose";

const connectDB = async () => {
    const { DATABASE_URL } = process.env;

    if (!DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined in environment variables.");
    }

    try {
        const { connection } = await mongoose.connect(DATABASE_URL);

        console.log(`✅ MongoDB Connected: ${connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
