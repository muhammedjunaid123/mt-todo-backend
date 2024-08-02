import { app } from "./app.js";
import  connectDB  from "./db/index.js";


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Visit at: http://localhost:${process.env.PORT || 3001}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
