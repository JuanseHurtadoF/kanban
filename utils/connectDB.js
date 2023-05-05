import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async (url) => {
  if (cachedConnection && cachedConnection.readyState >= 1) {
    // If the cached connection is ready, return without reconnecting
    return;
  }

  if (!url) {
    console.error("Error: MongoDB URL is missing");
    return;
  }
  try {
    const connection = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      maxPoolSize: 10,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);

    cachedConnection = connection;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
