import { app } from "./app.js";
import dotenv from "dotenv";
import  connectDB  from "./db/index.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Visit at: http://localhost:${process.env.PORT || 3001}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
