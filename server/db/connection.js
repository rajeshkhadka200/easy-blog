import mongoose from "mongoose";
const url = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    const conn = mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(`database connected succcessfully !!`);
    }
  } catch (error) {
    console.error(error);
  }
};
