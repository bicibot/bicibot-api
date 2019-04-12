import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from './routes/index';
import morgan from "morgan";
import connectToDb  from "./config/db";
import subdomain from "express-subdomain";
require("dotenv").config();

connectToDb();

const app = express();
const PORT = process.env.port || 3000;

app.use(subdomain('api', router));

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
