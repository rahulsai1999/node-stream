//dependencies
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import { dbConnect } from "./dbConnect";
import SongRoutes from "../routes/songRoutes";

//data
const app = express();
dbConnect();

dotenv.config();
const port = process.env.PORT || 3000;

//utilities
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/api", SongRoutes);

app.listen(port, () => {
  console.log("Running on port " + port);
});
