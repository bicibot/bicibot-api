import mongoose from "mongoose";
import signale from "signale";
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)

const connectToDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.user}:${process.env.pw}@${
        process.env.server
      }/${process.env.database}`,
      { useNewUrlParser: true }
    );
    signale.success("Database connection successful");
  } catch (err) {
    signale.fatal("Database connection error");
  }
};

export default connectToDb;
