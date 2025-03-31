import mongoose from "mongoose";

// const mongo = process.env.MONGODB_URI


const connectToMongoDB = async () =>{
    try {
        // console.log("MONGO DB URL IS :::", process.env.MONGODB_URI)
        // await mongoose.connect(mongo);
        // console.log("Connected to MongoDB");
        await mongoose.connect("mongodb://localhost:27017/noteapp");
        console.log("Connected to MongoDB");

    }
    catch (error) {
        console.log("Error connecting to MongoDB", error.message);

    }
};

export default connectToMongoDB;