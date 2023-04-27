import mongoose from "mongoose";

const connectDB = async (url) => {
  if (mongoose.connection.readyState >= 1) {
    // If the connection is ready, return without reconnecting
    return;
  }
  if (!url) {
    console.error("Error: MongoDB URL is missing");
    return;
  }
  console.log('here')
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;