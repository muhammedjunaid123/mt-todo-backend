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
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//
import { errorHandler } from "./middlewares/error.middlewares.js";

//import route
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project",projectRoute);

app.use(errorHandler);

export { app };
