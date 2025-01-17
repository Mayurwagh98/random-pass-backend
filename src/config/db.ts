import mongoose from "mongoose";

// Dealing with the deprecation warning
mongoose.set("strictQuery", true);

const connectDb = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/random-pass",
      {
        dbName: "random-pass",
      }
    );
    console.log(`Database connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectDb;
