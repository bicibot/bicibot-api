import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index";
import morgan from "morgan";
import signale from "signale";
import connectToDb from "./config/db";
require("dotenv").config();

connectToDb();

const app = express();
const PORT = process.env.port || 3000;

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  signale.success(`Server is running on ${PORT}`);
});

export default app;
