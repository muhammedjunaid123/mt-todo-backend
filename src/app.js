import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//
import { errorHandler } from "./middlewares/error.middlewares.js";

//import route
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import todoRoute from "./routes/todo.route.js";

const publicDir = path.join(__dirname, "public", "files");

 fs.mkdir(publicDir, { recursive: true }, (err) => {
  if (err) console.error(err);
});
//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/todo", todoRoute);

app.use(errorHandler);

export { app };
