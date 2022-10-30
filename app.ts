import cors from "cors";
import express from "express";
import "express-async-errors";
import router from "./src/route/index.js";

import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;