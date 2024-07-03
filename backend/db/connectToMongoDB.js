import mongoose from "mongoose";

const connectToMogoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MogoDB!");
    } catch (error) {
        console.log("Error connecting to MogoDB: ", error.message);
    }
};

export default connectToMogoDB;
