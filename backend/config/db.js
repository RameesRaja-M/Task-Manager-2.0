import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Mongo DB Connected");
    } catch (error) {
        console.error("Mongo DB Connected Failed");
        process.exit(1)
    }
}

export default connectDB