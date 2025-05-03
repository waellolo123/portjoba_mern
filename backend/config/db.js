import mongoose from "mongoose";

// db connection
const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Connected to database"));
  mongoose.connect(process.env.MONGO);
}

export default connectDB;

