import mongoose from "mongoose";
require("dotenv").config();

mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.user}:${process.env.pw}@${
        process.env.server
      }/${process.env.database}`,
      { useNewUrlParser: true }
    );
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection error");
  }
};

export default connectToDb;
