import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Visit at: http://localhost:${process.env.PORT || 3001}`);
});
