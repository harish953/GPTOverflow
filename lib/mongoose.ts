import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URL) {
    console.log("Missing MongoDB URL");
  }
  if (isConnected) {
    console.log("MongoDB is already connected");
  }
  try {
    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "gptoverflow", // @ts-no-check
    });

    isConnected = true;
    console.log(isConnected);
    console.log("mongoose is connected");
  } catch (error) {
    console.log("mongoose connection is failed", error);
  }
};
