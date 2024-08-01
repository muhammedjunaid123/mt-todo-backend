import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//import route
import userRoute from "./routes/user.route.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

//routes
app.use("/api/v1/user", userRoute);
app.use(errorHandler);
export { app };
